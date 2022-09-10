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

        //send messages to queue
        for(let i=0; i<=100; i++){
            channel.sendToQueue(queue, Buffer.from(`${i}`));
            console.log(`Your Message has been sent to ${queue} queue`);
        }
        setTimeout(()=>{
            connection.close();
        }, 1000);
    })
})