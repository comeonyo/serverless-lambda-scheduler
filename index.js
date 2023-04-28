module.exports.run = async (event, context) => {
  const time = new Date();
  console.log(`Your cron function "${context.functionName}" ran at ${time}`);
  console.log('event', event);
  console.log('context', context);
  console.log('done');
};
