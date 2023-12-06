import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google'
import User from "@/Models/User";

import dbConnect from "../../../utils/db";


export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: '197007217740-045ff8qf1q074e1vbn2i6p3imr134t12.apps.googleusercontent.com',
            clientSecret: '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',
            authorization: {
                params: {
                  prompt: "consent",
                  access_type: "offline",
                  response_type: "code"
                }
              }
            
            
        })
    ],
    
    
    // jwt:{
    //     encryption:true
    // },
    session:{
        jwt:true
    },
    secret:'0af2ef152c8a52b057af3eb9092f5aa0',
    callbacks:{
        async jwt({token,account, profile}){
          
            // if(account?.accessToken){
            //     token.accessToken = account.accessToken
            // }

            if (account) {
                token.accessToken = account.access_token
                token.id = profile.id
              }
          
            return token;
        },
        session: async({session, token}) => {
           
            
            if(token){
                session.user = token.user
            }
            return session
        },
        signIn: async ({user,account})=>{

            
            await dbConnect();

            console.log('inside signin')
            console.log(user);
                   
            let currentUser = await User.findOne({ id: user.id }).exec();

            console.log(currentUser);

        if (!currentUser) {
            currentUser = new User({

                    id:user.id,
                    name: user.name,
                    email:user.email,
                    pic:user.image,
                    role: 'User'
            })
            await currentUser.save();

        }
        return true;
        },

        async redirect({ url, baseUrl }) {
           

            return baseUrl
          },
        
    }
    


})




















// async signIn({ account, profile }) {
//     console.log('finding existing user');
//     dbConnect();
//     let user = await User.findOne({ 'account.id': profile.sub }).exec();
//     if (user) {
//         console.log('already exists')
//         return true;
//     }
//     else {
//         console.log('creatinga  new one')
//         user = new User({
//             account:
//             {
//                 id: profile.sub,
//                 name: profile.name,
//                 email: profile.email,
//                 pic: profile.picture,
//             },
//         })
//         const stat = new Stat();
//         stat.user = user._id;
//         await stat.save();
//         user.stats = stat._id;
//         await user.save();
//     }
//     console.log('reached')
//     console.log(user);
//     return true;
// },
