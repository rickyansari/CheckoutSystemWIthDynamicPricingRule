import React, { Component } from "react";
import {
  Image,
  Dimensions,
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity
} from "react-native";

import { RUPEES_SIGN } from "app/config/ENV";
import { COLORS } from "app/styles/Colors";
import products from "app/constants/Products";
import PurchasedProduct from "app/components/PurchasedProduct";

var { height, width } = Dimensions.get("window");

export default class OrderSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products,
      purchasedProductsId:  Object.keys(products)
    };
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.renderHeader()}
        {this.renderSeparator()}
        <ScrollView
          style={{
            width: width,
            backgroundColor: COLORS.WHITE,
            marginBottom: 50
          }}
        >
          {this.renderPurchasedProducts()}
        </ScrollView>
        {this.renderConfirmOrderButton()}
      </View>
    );
  }

  renderHeader() {
    const textStyle = {
      fontSize: 15,
      color: COLORS.TEXT_GRAY,
      fontWeight: "400"
    };
    return (
      <View style={{ flexDirection: "row", margin: 5, alignItems: "center" }}>
        <Text style={{ ...textStyle }}> Basket </Text>
      </View>
    );
  }

  renderSeparator() {
    return (
      <View
        style={{
          width: width - 10,
          margin: 5,
          opacity: 0.2,
          height: 0.3,
          backgroundColor: COLORS.TEXT_GRAY
        }}
      />
    );
  }

  removeItemFromList({ list = [], item = "" } = {}) {
    var index = list.indexOf(item);
    if (index > -1) {
      list.splice(index, 1);
    }
  }

  removeProductFromPurchasedProducts(productId) {
    const clonedState = JSON.parse(JSON.stringify(this.state));
    const { purchasedProductsId, products } = clonedState;
    products[productId].purchasedQuantity -= 1;
    this.setState({
      purchasedProductsId,
      products
    });
  }

  onPressPlusIcon = productId => {
    const { products } = this.state;
    products[productId].purchasedQuantity += 1;
    this.setState({ products: { ...products } });
  };

  onPressMinusIcon = productId => {
    const { products } = this.state;
    if (products[productId].purchasedQuantity > 0) {
      products[productId].purchasedQuantity -= 1;
      this.setState({ products: { ...products } });
    } 
  };

  renderPurchasedProducts() {
    const { products = {}, purchasedProductsId = [] } = this.state;
    if (!purchasedProductsId.length) return null;
    return purchasedProductsId.map(productId => {
      return (
        <PurchasedProduct
          key={productId}
          productData={products[productId]}
          onPressPlusIcon={this.onPressPlusIcon}
          onPressMinusIcon={this.onPressMinusIcon}
        />
      );
    });
  }

  addProductToPurchaseList = productId => {
    const clonedState = JSON.parse(JSON.stringify(this.state));
    const { purchasedProductsId, products } = clonedState;
    purchasedProductsId.push(productId);
    products[productId].purchasedQuantity += 1;
    this.setState({
      purchasedProductsId,
      products
    });
  };


  getBillingDetail() {
    const { products = {}, purchasedProductsId = [] } = this.state;
    let [totalAmount, totalDiscount, amountToPay] = [0, 0, 0];
    purchasedProductsId.map(productId => {
      const {
        price = 0,
        discount = 0,
        offerPrice = 0,
        purchasedQuantity = 1
      } = products[productId];
      totalAmount += price * purchasedQuantity;
      totalDiscount += discount * purchasedQuantity;
      amountToPay += offerPrice * purchasedQuantity;
    });
    return { totalAmount, totalDiscount, amountToPay };
  }

  renderFieldNameAndData({
    name,
    data,
    textStyle = {},
    isCurrency = true
  } = {}) {
    const color = COLORS.GREEN;
    const fontSize = 15;
    return (
      <View style={{ margin: 5, width: width - 10, flexDirection: "row" }}>
        <Text style={{ flex: 1, color, fontSize, ...textStyle }}>{name}</Text>
        <Text style={{ color, fontSize, ...textStyle }}>
          {isCurrency ? RUPEES_SIGN : null}
          {data}
        </Text>
      </View>
    );
  }


  renderConfirmOrderButton() {
    const { products = {}, purchasedProductsId = [] } = this.state;
    const {
      totalAmount = 0,
      totalDiscount = 0,
      amountToPay = 0
    } = this.getBillingDetail();
    return (
      <TouchableOpacity
        style={{
          width: "100%",
          height: 50,
          backgroundColor: COLORS.GREEN,
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          bottom: 0,
          left: 0
        }}
        onPress={() => {
          const purchasedProducts = {};
          purchasedProductsId.forEach(productId => {
            purchasedProducts[productId] = products[productId];
          });
          this.props.navigation.push("Cart", {
            purchasedProducts,
            totalAmount,
            totalDiscount,
            amountToPay
          });
        }}
      >
        <Text style={{ color: COLORS.WHITE, fontSize: 15 }}>Confirm Order</Text>
      </TouchableOpacity>
    );
  }
}
