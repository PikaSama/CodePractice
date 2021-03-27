type updateFn = (msg: string) => void;

class Channel {
    private SubscriberList: Map<Subscriber, updateFn>;

    public constructor() {
        this.SubscriberList = new Map();
    }

    public addMember(member: Subscriber, fn: updateFn): void {
        this.SubscriberList.set(member, fn);
    }

    public removeMember(member: Subscriber): void {
        this.SubscriberList.delete(member);
    }

    public publish(msg: string): void {
        for (const i of this.SubscriberList.values()) {
            i(msg);
        }
    }
}

class Subscriber {
    private subscribedChannels: Map<Channel, updateFn>;

    public constructor() {
        this.subscribedChannels = new Map();
    }

    public subscribe(channel: Channel, callback: updateFn): void {
        if (!this.subscribedChannels.get(channel)) {
            this.subscribedChannels.set(channel, callback);
            channel.addMember(this, callback);
            console.log('Subscribed.');
        } else {
            console.log('You have already subscribed the channel!');
        }
    }

    public unsubscribe(channel: Channel): void {
        if (this.subscribedChannels.get(channel)) {
            this.subscribedChannels.delete(channel);
            channel.removeMember(this);
            console.log('Unsubscribed.');
        } else {
            console.log('You are not subscribed to the channel!');
        }
    }
}

const Mike = new Subscriber();
const lifeNews = new Channel();
const techNews = new Channel();
Mike.subscribe(lifeNews, (msg): void => {
    console.log('Mike:', msg, '(from life news.)');
});
Mike.subscribe(techNews, (msg): void => {
    console.log('Mike:', msg, '(from tech news.)');
});
lifeNews.publish('I am a loser.');
techNews.publish('Zorin is handsome.');
