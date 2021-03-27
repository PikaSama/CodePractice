/**
class Community {
    private channelsList: Map<string, Subscriber[]>;

    public constructor() {
        this.channelsList = new Map();
    }

    public addChannel(name: string): void {
        this.channelsList.get(name) || this.channelsList.set(name, []);
    }

    public removeChannel(name: string): void {
        this.channelsList.get(name) && this.channelsList.delete(name);
    }

    public addSubscriber(channel: string, subscriber: Subscriber): boolean {
        const SubscriberList = this.channelsList.get(channel);
        if (SubscriberList) {
            SubscriberList.push(subscriber);
            return true;
        }
        return false;
    }

    public removeSubscriber(channel: string, subscriber: Subscriber): boolean {
        let SubscriberList = this.channelsList.get(channel);
        if (SubscriberList) {
            SubscriberList = SubscriberList.filter((val): boolean => {
                return val !== subscriber;
            });
            return true;
        }
        return false;
    }

    public publish(channel: string, msg: string): boolean {
        const SubscriberList = this.channelsList.get(channel);
        if (SubscriberList) {
            SubscriberList.map((val): string => {
                val.updateFns.get(channel).call(val, msg);
                return '';
            });
            return true;
        }
        return false;
    }
}

type updateFn = (msg: string) => void;
class Subscriber {
    public updateFns: Map<string, updateFn>;
    private name: string;
    private community: Community;

    public constructor(name: string, community: Community) {
        this.name = name;
        this.community = community;
        this.updateFns = new Map();
    }

    public subscribe(channel: string, Fn: updateFn): void {
        if (this.community.addSubscriber(channel, this)) {
            this.updateFns.set(channel, Fn);
            console.log(`${this.name} subscribed channel ${channel}`);
        } else {
            console.log(`${this.name}: Could not find the channel in your community.`);
        }
    }

    public unsubcribe(channel: string): void {
        const unsubscribeChannel = this.updateFns.get(channel);
        if (unsubscribeChannel) {
            this.community.removeSubscriber(channel, this);
            console.log(`${this.name} unsubscribed channel ${channel}`);
        } else {
            console.log(`${this.name}: Could not find the channel you subscribed.`);
        }
    }
}

const myCommunity = new Community();
myCommunity.addChannel('news');
const Mike = new Subscriber('Mike', myCommunity);
// const Tom = new Subscriber('Tom', myCommunity);
Mike.subscribe('news', (msg): void => {
    console.log('Mike:' + msg);
});
myCommunity.publish('news', 'Zorin is handsome');
*/
