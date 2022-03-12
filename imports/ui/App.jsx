import React, {useEffect, useState} from 'react';
export const App = () => {
  const [NewLink , SetNewLink] = useState('');
  const [LinksLoading , SetLinksLoading] = useState(true);
  const [Links , SetLinks] = useState([]);

  const fetchLinks = () => {
    Meteor.call('FindLinks', (err, links)=>{
      SetLinksLoading(false);
      if (err) {
        console.log(err);
      } else {
        SetLinks(links);
      }
    });
  }

  useEffect(() => {
    fetchLinks();
  }, [])

  const ChangeInput = (e)=>{
    SetNewLink(e.target.value);
  }

  const SubmitForm = (e)=>{
    e.preventDefault();
    Meteor.call('NewLink',NewLink , (err)=>{
        if (err) {
          console.log(err);
        } else {
          SetNewLink('');
          fetchLinks();
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
