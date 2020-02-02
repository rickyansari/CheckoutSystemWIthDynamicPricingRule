# Checkout System WIth Dynamic Pricing Rule


We want to offer below products to customers:

| Name  | Description | Retail Price |
| ------------- | ------------- |------------- |
| Small  |  Pizza 10” pizza for one person  | $269.99  |
| Medium  |  Pizza 12” pizza for two people  | $322.99 |
| Large  | Pizza 15” pizza for four people |$394.99  |


We have established a number of special pricing rules for a small number of privileged.
customers:
1. Infosys
    - Gets a 3 for 2 deal for Small Pizzas
2. Amazon
    - Gets a discount on Large Pizza where the price drops to $299.99 per pizza
3. Facebook
    - Gets a 5 for 4 deal on Medium Pizza
    - Gets a discount on Large Pizza where the price drops to $389.99 per pizza

These details are regularly renegotiated, so we need the pricing rules to be as flexible as possible as they can change in the future with little notice.

The interface to our checkout module looks like this pseudocode:

```javascript
Checkout co = Checkout.new(pricingRules)
co.add(item1)
co.add(item2)
co.total()
 ``` 


Example scenarios:
```
Customer: default
Items: `small pizza`, `medium pizza`, `large pizza`
Total: $987.97

Customer: Infosys
Items: ` small pizza `, ` small pizza `, ` small pizza `, ` large pizza `
Total: $934.97

Customer: Amazon
Items: ` medium pizza `, ` medium pizza `, ` medium pizza `, ` large pizza `
Total: $1294.96
```