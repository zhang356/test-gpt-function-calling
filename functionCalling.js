import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanMessage, ChatMessage, SystemMessage, FunctionMessage, AIMessage } from "langchain/schema";

const OPENAI_API_KEY="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";

const extractionFunctionSchema = {
    name: "conversation_analyzer",
    description: "analyze conversation and extract sentiment, topic, names, memory loss and repeated questions",
    parameters: {
        type: "object",
        properties: {
            sentiment_score: {
                type: "number",
                description: "The sentiment of the human. 10 means most positive, 1 means most negative",
            },
            confidence: {
                type: "number",
                description: "your confidence of the sentiment score. Confidence number should be from 1 to 10 as well. 10 be most confidence, 1 being the least confidence",
            },
            topic: {
                type: "string",
                description: "what topic does the human enjoys talk about? ",
            },
            names: {
                type: "array", 
                description: "What names has the human mentioned?",
                items: {
                    type: "string"
                }
            }, 
            memory_loss: {
                type: "boolean",
                description: "Do you feel the human have memory loss based on the conversation?"
            },
            repeated_question: {
                type: "string",
                description: "If there are any question the human has been repeated asking, please specify the questions"
            }
        },
        required: ["sentiment_score", "confidence", "topic", "names", "memory_loss", "repeated_question"],
    },
};

const model = new ChatOpenAI({ 
    openAIApiKey: OPENAI_API_KEY, 
    temperature: 0.9,
    modelName: "gpt-4",
}).bind({
    functions: [extractionFunctionSchema],
    function_call: { name: "conversation_analyzer" },
});


const result = await model.invoke([
    new AIMessage("What do you like to do in your free time?"), 
    new HumanMessage("Hi, that's exactly i'm here. I really don't know what would like to do in my free time. I'm trying to figure it out. In fact, i'm also trying to figure what I love to do long term."), 
    new AIMessage("That’s a great place to be, in a sense - you get to start from scratch and try lots of new things to see what you like! 🙌💥 When it comes to figuring out what you like to do, I’d recommend doing a couple of things. First, take stock of the things you enjoy doing right now. Second, experiment with new things. Third, reflect on what you enjoyed about those new experiences, what you didn’t like, and what that can tell you about your interests. Ready to dive in? 😊"), 
    new HumanMessage("ok, when trying new thing, I quickly lose the interests, also it's easily for me to back off if I encouter challenges, what should I do?"), 
    new AIMessage("Well, first, it's important to realize that everyone has a different learning curve and everyone has different things that make them motivated to keep going. So if you lose interest quickly, or if you tend to give up when things get tough, you're not alone. That said, let's talk about how you can stick to things a bit longer. First, let's figure out why you're losing interest. Is it because you're bored, or because you feel overwhelmed? Or maybe you're struggling to make progress?"), 
    new HumanMessage("I'm afraid of another failure, I guess. Also in general, when I see difficult things, I don't want to do it."), 
    new AIMessage("That’s pretty understandable. No one likes to fail. And being afraid of failing or struggling can make it really hard to stay motivated. But know this - failure is actually a really important part of success. Let me explain. Most people who have achieved great things have failed many, many times before they found success. Failing isn't the end of the journey - it's part of it. So how can you shift your mindset around failure?"), 
    new HumanMessage("I'm not sure, I thought you had some good ways of doing that?"), 
    new AIMessage("Well, first, let's acknowledge that being afraid of failure is a natural human emotion. So you're not alone. But let's think about why failing at something is actually not that bad. For one, it helps you learn. Every time you try something new, you're bound to make mistakes. But by making mistakes, you're learning what doesn't work, and that gets you closer to figuring out what does work. Think of it as a process of elimination. What if instead of thinking about failure as a negative outcome, you thought of it as valuable feedback that helps you improve?"), 
    new HumanMessage("but I still pay the price when I fail. Just like I trade stocks, I still lose money when I made a bad decision."), 
    new AIMessage("You're right, there is often a real cost associated with failure. But what if we think about it another way. There's a quote I love from Thomas Edison, who famously failed many times when trying to invent the lightbulb. When asked about his failures, he said, I have not failed. I've just found 10,000 ways that won't work. Can you see how a small shift in mindset can reframe failure from something negative to something that is a necessary part of success?"), 
]);
  
console.log(result);


