const AWS = require('aws-sdk');
AWS.config.loadFromPath('./config.json');

(async () => {
  const ec2 = new AWS.EC2({ apiVersion: '2016-11-15' });

  const params = {
    InstanceIds: [ 'i-0e56a5d3afa185fde' ]
  };
  console.log(JSON.stringify(await ec2.describeInstanceStatus(params).promise()));

  // const params = {
  //   ImageId: 'ami-466768ac',
  //   InstanceType: 't1.micro',
  //   KeyName: 'eil',
  //   MinCount: 1,
  //   MaxCount: 1
  // };

  // try {
  //   const { instances: [{ instanceId }] = await ec2.runInstances(params).promise();
  //   console.log(JSON.stringify(instanceId, null, 2));
  // }
  // catch (err) {
  //   console.log(err);
  // }
})();
