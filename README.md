# tradebot1-nodejs


### TESTED UNDER:

Virtual machine details:  
- Ubuntu 20.04 (LTS) x64  
-- 2 GB RAM  
-- 1 CPU  
-- 50 GB SSD Disk  
-- 2 TB transfer  

node version: 10.19.0  
npm version: 6.14.4  


### CONTROLS

```npm test```

```npm start```

```node runTradeBot.js --debug --timestamp```



### FUTURE IMPROVEMENTS






better settings for choosing volumes for new orders.


Look at rounding issues. 


Store orders in a more organised way. 
- Add orderIDs. 


Reduce the amount of code by handling the side ('bid', 'ask') as a variable. 


dev branch.


linter. 


dedicated service user with limited privileges. 



status monitoring. 



alerts.



trading volume failsafes. price failsafes. 



trading limits / deadbolts



dev / production settings & config.
- API key storage. 



remove package-version-greater-than ('^') settings in package.json 'dependencies'. 



- logging in JSON, for log collectors & log display applications.



- check for failed API calls. 
-- a proper function dedicated to making API calls and checking for good responses. 



big.js precision for different assets. 



### SAMPLE OUTPUT

```bash

stjohn@tradebot1:~/tradebot1-nodejs$ node runTradeBot.js --debug --timestamp
2020-12-01T15:18:56.627Z INFO    [TradeBot] TradeBot initialised.
2020-12-01T15:18:56.631Z INFO    [TradeBot] ### Start of trading cycle
2020-12-01T15:18:56.632Z INFO    [TradeBot] bestBid: 191.9, bestAsk: 206.9
2020-12-01T15:18:56.633Z INFO    [TradeBot] PLACE BID @ 184.95 0.17
2020-12-01T15:18:56.634Z INFO    [TradeBot] PLACE BID @ 189.85 0.39
2020-12-01T15:18:56.635Z INFO    [TradeBot] PLACE BID @ 191.18 0.20
2020-12-01T15:18:56.636Z INFO    [TradeBot] PLACE BID @ 190.97 0.46
2020-12-01T15:18:56.638Z INFO    [TradeBot] PLACE BID @ 185.04 0.23
2020-12-01T15:18:56.639Z INFO    [TradeBot] PLACE ASK @ 214.30 0.34
2020-12-01T15:18:56.641Z INFO    [TradeBot] PLACE ASK @ 209.95 0.18
2020-12-01T15:18:56.642Z INFO    [TradeBot] PLACE ASK @ 212.99 0.44
2020-12-01T15:18:56.643Z INFO    [TradeBot] PLACE ASK @ 211.00 0.46
2020-12-01T15:18:56.644Z INFO    [TradeBot] PLACE ASK @ 207.73 0.32
2020-12-01T15:19:01.651Z INFO    [TradeBot] ### End of trading cycle
2020-12-01T15:19:01.654Z INFO    [TradeBot] ### Start of trading cycle
2020-12-01T15:19:01.655Z INFO    [TradeBot] bestBid: 195.84, bestAsk: 210.84
2020-12-01T15:19:01.657Z INFO    [TradeBot] CANCEL BID @ 184.95 0.17
2020-12-01T15:19:01.660Z INFO    [TradeBot] CANCEL BID @ 185.04 0.23
2020-12-01T15:19:01.662Z INFO    [TradeBot] CANCEL ASK @ 209.95 0.18
2020-12-01T15:19:01.662Z INFO    [TradeBot] CANCEL ASK @ 207.73 0.32
2020-12-01T15:19:01.663Z INFO    [TradeBot] PLACE BID @ 192.91 0.12
2020-12-01T15:19:01.664Z INFO    [TradeBot] PLACE BID @ 188.50 0.44
2020-12-01T15:19:01.665Z INFO    [TradeBot] PLACE ASK @ 220.22 0.38
2020-12-01T15:19:01.666Z INFO    [TradeBot] PLACE ASK @ 215.36 0.20
2020-12-01T15:19:06.673Z INFO    [TradeBot] ### End of trading cycle
2020-12-01T15:19:06.673Z INFO    [TradeBot] ### Start of trading cycle
2020-12-01T15:19:06.673Z INFO    [TradeBot] bestBid: 195.99, bestAsk: 210.99
2020-12-01T15:19:11.679Z INFO    [TradeBot] ### End of trading cycle
2020-12-01T15:19:11.679Z INFO    [TradeBot] ### Start of trading cycle
2020-12-01T15:19:11.679Z INFO    [TradeBot] bestBid: 171.14, bestAsk: 186.14
2020-12-01T15:19:11.680Z INFO    [TradeBot] FILLED BID @ 189.85 0.39 (Balances: 10.39 ETH, 1925.96 USD)
2020-12-01T15:19:11.680Z INFO    [TradeBot] FILLED BID @ 191.18 0.20 (Balances: 10.59 ETH, 1887.72 USD)
2020-12-01T15:19:11.680Z INFO    [TradeBot] FILLED BID @ 190.97 0.46 (Balances: 11.05 ETH, 1799.8700000000001 USD)
2020-12-01T15:19:11.681Z INFO    [TradeBot] FILLED BID @ 192.91 0.12 (Balances: 11.17 ETH, 1776.72 USD)
2020-12-01T15:19:11.681Z INFO    [TradeBot] FILLED BID @ 188.50 0.44 (Balances: 11.61 ETH, 1693.78 USD)
2020-12-01T15:19:11.681Z INFO    [TradeBot] CANCEL ASK @ 214.30 0.34
2020-12-01T15:19:11.682Z INFO    [TradeBot] CANCEL ASK @ 212.99 0.44
2020-12-01T15:19:11.683Z INFO    [TradeBot] CANCEL ASK @ 211.00 0.46
2020-12-01T15:19:11.683Z INFO    [TradeBot] CANCEL ASK @ 220.22 0.38
2020-12-01T15:19:11.684Z INFO    [TradeBot] CANCEL ASK @ 215.36 0.20

```
