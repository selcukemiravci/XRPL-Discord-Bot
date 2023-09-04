# XRPL Pioneers - Ripple Intern Hackathon Summer '23

## Table of Contents

1. [Overview](#overview)
2. [Front-end: Discord Bot](#frontend-discord-bot)
3. [Back-end: Python Scripts](#backend-python-scripts)
4. [NFT Claiming Feature](#nft-claiming-feature)
6. [Notes](#notes)

<a name="overview"></a>
## Overview

A Discord AI chatbot trained on XRPL Documentation. The bot is shared in a Discord channel for XRPL developers to learn more about the XRPL ecosystem. It can answer questions about the XRPL, initiate XRP transfers, and it also features an NFT claiming function for XRPL-developed NFTs.

![Discord Experience](https://github.com/selcukemiravci/XRPL-Discord-Bot/assets/53044008/ba984894-ef5e-4c03-b896-0b67a0cdc181)

<a name="frontend-discord-bot"></a>
## Front-end: Discord Bot

The Discord bot serves as the front-end in our application. It's responsible for receiving messages from users in the Discord channel, handling user interactions, and sending responses back to the channel.

<a name="backend-python-scripts"></a>
## Back-end: Python Scripts

The python scripts, trained LLM and Javascript acts as the back-end. It's responsible for processing the user's questions, querying the openai api to generate responses, and provides the response back to the discord bot.

<a name="nft-claiming-feature"></a>
## NFT Claiming Feature

One of the primary features of the bot is to allow users to claim NFTs. This process works as follows:

1. A user types `Claim NFT` in the Discord channel.
2. The bot triggers a process transfer a pre-minted NFT to the user that has been generated via Pintata (IPFS), Infura, Lexica Art AI, and XRPL POAP API.
3. The NFT is then hosted on a Firebase application.
4. The bot generates a QR code for the firebase application and sends it to the user in the Discord channel.
5. The user can scan the QR code which redirects them to the hosted firebase application, where they can claim using Xumm Wallet.

### How to Use

1. Interact with the bot in Discord. You can ask questions, initiate transfers, or claim NFTs.
2. To claim an NFT, type `Claim NFT`. The bot will provide a QR code.
3. Scan the QR code to be redirected to the hosted NFT on Firebase.
4. Claim your NFT.

<details>
  <summary><a name="ripple-intern-hackathon-event-info"></a>Ripple Intern Hackathon Event Info</summary>


## Notes

This project is developed for educational purposes and to provide a hands-on way for users to learn more about the XRPL ecosystem.
