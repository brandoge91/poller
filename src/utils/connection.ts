import rlp from 'roblox-long-polling';
import logger from 'loggis';

let mainConnection;
let poll;

export async function initializeConnection() {
    poll = new rlp({
        port: process.env.PORT || 3000,
    });

    logger.info('Initializing connection...')
    
    poll.on('connection', (connection) => {
        mainConnection = connection;
        logger.info(`New connection! ID: ${connection.id}`);
        connection.send('internal_ping',connection.id);
        connection.on('internal_ping', () => {
            logger.info(`Recieved callback ping from connection  ${connection.id}`);
        });
        connection.on('disconnect', () => {
            logger.info('Disconnection at ' + connection.id);
        });
    });
};

export async function sendPoll(title:String, message:String) {
    mainConnection.send(title,message);
    logger.info(`Sending connection with title ${title} to ${mainConnection.id}`);
};