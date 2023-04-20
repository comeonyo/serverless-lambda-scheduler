# Deploy Lambda using serverless framework
```yaml
# serverless.yaml
service: tick-tack
frameworkVersion: '3'

provider:
  name: aws
  runtime: nodejs18.x
  region: ap-northeast-2
  memorySize: 128
  timeout: 10

functions:
  tick-tack:
    name: tick-tack
    handler: index.run
    events:
      - schedule: 
          rate: cron(0/1 * * * ? *)
          enabled: true
      - eventBridge:
          enabled: true
          name: fire-every-minute
          description: "Fire every minute"
          schedule: cron(0/1 * * * ? *)
        
```
위에서 사용한 EventBridge Rules 말고 EventBridge Scheduler 서비스가 있다.  
하지만 현재 serverless에서 지원하지 않는다.

# Logs
EventBridge Rules가 전달하는 event 객체의 time은 UTC+0이다. 

## fire-every-minute
```
2023-04-13T14:38:09.361Z	12ab4ed1-1234-1234-1234-a1234564499d	INFO	Your cron function "tick-tack" ran at Thu Apr 13 2023 14:38:09 GMT+0000 (Coordinated Universal Time)

2023-04-13T14:38:09.380Z	12ab4ed1-1234-1234-1234-a1234564499d	INFO	event {
  version: '0',
  id: '12ab4ed1-1234-1234-1234-a1234564499d',
  'detail-type': 'Scheduled Event',
  source: 'aws.events',
  account: '123412341234',
  time: '2023-04-13T14:38:00Z',
  region: 'ap-northeast-2',
  resources: [
    'arn:aws:events:ap-northeast-2:123412341234:rule/fire-every-minute'
  ],
  detail: {}
}

2023-04-13T14:38:09.381Z	12ab4ed1-1234-1234-1234-a1234564499d	INFO	context {
  callbackWaitsForEmptyEventLoop: [Getter/Setter],
  succeed: [Function (anonymous)],
  fail: [Function (anonymous)],
  done: [Function (anonymous)],
  functionVersion: '$LATEST',
  functionName: 'tick-tack',
  memoryLimitInMB: '128',
  logGroupName: '/aws/lambda/tick-tack',
  logStreamName: '2023/04/13/[$LATEST]123412341234123412341234123412341234',
  clientContext: undefined,
  identity: undefined,
  invokedFunctionArn: 'arn:aws:lambda:ap-northeast-2:123412341234:function:tick-tack',
  awsRequestId: '12ab4ed1-1234-1234-1234-a1234564499d',
  getRemainingTimeInMillis: [Function: getRemainingTimeInMillis]
}
```

## 이름 없이 만들었던 스케줄러
```
2023-04-13T14:36:04.640Z	43214321-4321-4321-4321-432143214321	INFO	Your cron function "tick-tack" ran at Thu Apr 13 2023 14:36:04 GMT+0000 (Coordinated Universal Time)

2023-04-13T14:36:04.642Z	43214321-4321-4321-4321-432143214321	INFO	event {
  version: '0',
  id: '43214321-4321-4321-4321-432143214321',
  'detail-type': 'Scheduled Event',
  source: 'aws.events',
  account: '432143214321',
  time: '2023-04-13T14:36:00Z',
  region: 'ap-northeast-2',
  resources: [
    'arn:aws:events:ap-northeast-2:432143214321:rule/tick-tack-dev-TickDashtackEventsRuleSchedule1-432143214321'
  ],
  detail: {}
}

2023-04-13T14:36:04.659Z	43214321-4321-4321-4321-432143214321	INFO	context {
  callbackWaitsForEmptyEventLoop: [Getter/Setter],
  succeed: [Function (anonymous)],
  fail: [Function (anonymous)],
  done: [Function (anonymous)],
  functionVersion: '$LATEST',
  functionName: 'tick-tack',
  memoryLimitInMB: '128',
  logGroupName: '/aws/lambda/tick-tack',
  logStreamName: '2023/04/13/[$LATEST]432143214321432143214321',
  clientContext: undefined,
  identity: undefined,
  invokedFunctionArn: 'arn:aws:lambda:ap-northeast-2:432143214321:function:tick-tack',
  awsRequestId: '43214321-4321-4321-4321-432143214321',
  getRemainingTimeInMillis: [Function: getRemainingTimeInMillis]
}
```