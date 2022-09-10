const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost',(connError, connection)=>{
    if(connError){
        throw connError;
    }

    //Create Channel
    connection.createChannel((channelError, channel)=>{
        if(channelError){
            throw channelError;
        }

        //Asserting queue
        const queue = 'test';
        channel.assertQueue(queue);

        //Receive Message
        channel.consume(queue, (msg)=>{
            console.log(`Message received: ${msg.content.toString()}`);
        }, {
            noAck: true
        })
        setTimeout(()=>{
            connection.close();
        }, 1000);
    })
})