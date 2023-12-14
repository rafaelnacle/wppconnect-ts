import fs from 'fs';
import { create, Message } from '@wppconnect-team/wppconnect';

async function initializeWppConnect() {
    try {
        const client = await create({
            session: 'sessionName',
            catchQR: (base64Qr: string, asciiQR: string) => {
                console.log(asciiQR);

                const matches = base64Qr.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
                const response: any = {};

                if (!matches || matches.length !== 3) {
                    throw new Error('Invalid input string');
                }

                response.type = matches[1];
                response.data = Buffer.from(matches[2], 'base64');

                const imageBuffer = response;
                fs.writeFile('out.png', imageBuffer['data'], 'binary', (err) => {
                    if (err != null) {
                        console.log(err);
                    }
                });
            },
            logQR: false,
        });

        await start(client);
    } catch (error) {
        console.log(error);
    }
}

async function start(client: any) {
    client.onMessage((message: Message) => {
        const option = message.body.toLowerCase();

        switch (option) {
            case 'olá':
                client.sendText(message.from, `
                Olá, como posso te ajudar?
                1 - Suporte
                2 - Marketing
                `.trim())
                    .then((result: any) => {
                        console.log('Result: ', result); //return object success
                    })
                    .catch((error: Error) => {
                        console.error('Error when sending: ', error); //return object error
                    });
                break;
            case '1':
                client.sendText(message.from, `Bem vindo ao suporte`)
                    .then((result: any) => {
                        console.log('Result: ', result); //return object success
                    })
                    .catch((error: Error) => {
                        console.error('Error when sending: ', error); //return object error
                    });
                break;
            case '2':
                client.sendText(message.from, `Bem vindo ao Marketing`)
                    .then((result: any) => {
                        console.log('Result: ', result); //return object success
                    })
                    .catch((error: Error) => {
                        console.error('Error when sending: ', error); //return object error
                    });
                break;
            default:
                client.sendText(message.from, `Opção inválida`)
                    .then((result: any) => {
                        console.log('Result: ', result); //return object success
                    })
                    .catch((error: Error) => {
                        console.error('Error when sending: ', error); //return object error
                    });
                break;
        }
    });
}

initializeWppConnect();