"""
@package        chat.py

@description    query with gpt-3 and return response

                <ACTION> someone messages the bot in a discord channel
                ->
                msg.content
                ->
                const response = query_openai(msg.content)
                ->
                msg.reply(response)
                ->
                <ACTION> a reply happens in the discord channel

@dependencies   pip install openai
                pip install chromadb
                pip install tiktoken
                pip install langchain
"""

import os
import sys
import constants as constants

from langchain.document_loaders import TextLoader
from langchain.indexes import VectorstoreIndexCreator

os.environ["OPENAI_API_KEY"] = constants.APIKEY

# get the question from the command-line argument
query = sys.argv[1]

# uncomment the below to check the question
# print(query)

loader = TextLoader('data.txt')

index = VectorstoreIndexCreator().from_loaders([loader])

print(index.query(query))
