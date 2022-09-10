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
        setTimeout(()=>{
            channel.consume(queue, (msg)=>{
                console.log(`Message received: ${msg.content.toString()}`);
            }, {
                noAck: true
            })
            setTimeout(()=>{
                connection.close();
            }, 5000);
        }, 2000)
        
    })
})