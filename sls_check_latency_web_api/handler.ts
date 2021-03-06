import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import 'request';
import * as request from 'request-promise';

export const latencyCheck: APIGatewayProxyHandler = async (event, _context) => {
    // TODO: edit below information
    const targets = [
        {
            name: 'WriteTargetName',
            uri: 'http://www.google.com',
        },
    ];

    for (const target of targets) {
        await request({ uri: target.uri, method: 'GET', time: true }, (err, resp) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log(`[${target.name}] Time: ${resp.timings.end}`);
        });
    }

    return {
        statusCode: 200,
        body: JSON.stringify(
            {
                message: 'Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!',
            },
            null,
            2
        ),
    };
};
