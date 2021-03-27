class Channel {
    constructor() {
        this.SubscriberList = new Map();
    }
    addMember(member, fn) {
        this.SubscriberList.set(member, fn);
    }
    removeMember(member) {
        this.SubscriberList.delete(member);
    }
    publish(msg) {
        for (const i of this.SubscriberList.values()) {
            i(msg);
        }
    }
}
class Subscriber {
    constructor() {
        this.subscribedChannels = new Map();
    }
    subscribe(channel, callback) {
        if (!this.subscribedChannels.get(channel)) {
            this.subscribedChannels.set(channel, callback);
            channel.addMember(this, callback);
            console.log('Subscribed.');
        }
        else {
            console.log('You have already subscribed the channel!');
        }
    }
    unsubscribe(channel) {
        if (this.subscribedChannels.get(channel)) {
            this.subscribedChannels.delete(channel);
            channel.removeMember(this);
            console.log('Unsubscribed.');
        }
        else {
            console.log('You are not subscribed to the channel!');
        }
    }
}
const Mike = new Subscriber();
const lifeNews = new Channel();
const techNews = new Channel();
Mike.subscribe(lifeNews, (msg) => {
    console.log('Mike:', msg, '(from life news.)');
});
Mike.subscribe(techNews, (msg) => {
    console.log('Mike:', msg, '(from tech news.)');
});
lifeNews.publish('I am a loser.');
techNews.publish('Zorin is handsome.');
