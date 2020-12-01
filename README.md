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


