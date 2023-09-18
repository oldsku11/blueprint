import { toNano } from 'ton-core';
import { FirstTry } from '../wrappers/FirstTry';
import { compile, NetworkProvider } from '@ton-community/blueprint';

export async function run(provider: NetworkProvider) {
    const firstTry = provider.open(
        FirstTry.createFromConfig(
            {
                id: Math.floor(Math.random() * 10000),
                counter: 0,
            },
            await compile('FirstTry')
        )
    );

    await firstTry.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(firstTry.address);

    console.log('ID', await firstTry.getID());
}
