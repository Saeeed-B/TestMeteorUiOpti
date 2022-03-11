import { Meteor } from "meteor/meteor";
import {LinksCollection}  from "../api/Link";

// It could be removed as it is not used anymore
Meteor.publish('AllLinksPublish', function() {
    return LinksCollection.find({});
});
