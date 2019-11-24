const { ApolloServer, gql } = require('apollo-server');
let ManageTracker = require('./controller.js');
let manageTracker = new ManageTracker();
const typeDefs = gql`
    type PriceList{
        date: String
        price: Int
    }
    type Track{
        _id:String
        url:String        
        startPrice:Int
        startDate:String
        todayPrice:Int 
        priceList: [PriceList]
    }
    type Query{
        getTracklist:[Track]
        getTracker(id:String!):[Track]
    }
    type Mutation{
        addTracker(url:String):[Track]
    }
`;

const resolvers = {
    Query: {
        getTracklist: () => manageTracker.getTrackerList(),
        getTracker: (parent, args) => {
            let id = args.id;
            return manageTracker.getTrackerById(id);
        }
    },
    Mutation:{
        addTracker:async (parent,args)=>{
            let resp = await manageTracker.addTracker(args.url);
            return [resp];
            
        }
    }
};


let server = new ApolloServer({
    typeDefs,
    resolvers
});


server.listen()
    .then(({ url }) => console.log(`Server Started at ${url}`))
    .catch((err) => console.log("err:", JSON.stringify(err)));
