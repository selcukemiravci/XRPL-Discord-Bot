const xrpl = require('xrpl');

async function transferXRP(recipientAddress, amount) {
    const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233");
    await client.connect();

    // Assuming the bot has its own predefined wallet for transferring rewards
    const bot_wallet = xrpl.Wallet.fromSeed(process.env.BOT_XRP_SEED);

    const prepared = await client.autofill({
        "TransactionType": "Payment",
        "Account": bot_wallet.address,
        "Amount": xrpl.xrpToDrops(amount),
        "Destination": recipientAddress
    }, 10);

    const signed = bot_wallet.sign(prepared);
    await client.submitAndWait(signed.tx_blob);

    // Disconnect from the XRPL client after the transaction
    client.disconnect();
}

module.exports = {
    transferXRP
};
