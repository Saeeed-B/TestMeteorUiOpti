import React , {useState} from 'react';
import { LinksCollection } from '../api/Link';
import { useTracker } from 'meteor/react-meteor-data';
export const App = () => {
  const [NewLink , SetNewLink] = useState('');

  const {Links,LinksLoading} = useTracker(() => {

        const subs  = Meteor.subscribe('AllLinksPublish');
        const LinksLoading = !subs.ready();
        const Links = LinksCollection.find({}).fetch();

        return {
          Links,
          LinksLoading
        }; 
  }); 


  const ChangeInput = (e)=>{
    SetNewLink(e.target.value);
  }
  const SubmitForm = (e)=>{
    e.preventDefault();
    Meteor.call('NewLink',NewLink , (err)=>{
        if (err) {
          console.log(err);
        }
    })
  }


  return(
    <div>

    <h1>Welcome to Meteor!</h1>

    {!LinksLoading
      ?
        <div>
            {Links.map((link , index)=>{
              return <div>{link._id} : {link.title}</div>
            })}
        </div>
      :'loading'
    }

    <form onSubmit={SubmitForm} style={{marginTop:"50px"}}>
      <input value={NewLink} onChange={ChangeInput} type="text"  placeholder='insert new link' />
      <button type="submit">send</button>
    </form>

    </div>
  );
  
};
