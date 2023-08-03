"""   
@package chat.py
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
"""   

import os
import sys
import constants
from langchain.document_loaders import TextLoader
from langchain.indexes import VectorestroreIndexCreator

os.environ["OPENAI_API_KEY"] = constants.APIKEY

query sys.argv[1]

print(query)

loader = TextLoader('data.txt');

index = VectorestoreIndexCreator().from_loaders((loader))

print (index.query(query))
