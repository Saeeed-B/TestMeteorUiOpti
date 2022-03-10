import {Meteor} from 'meteor/meteor';
import {LinksCollection} from '../api/Link'
Meteor.methods({
    NewLink(title){
        LinksCollection.insert({
            title : title.trim()
        })
    }
});