// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Demo {
    struct User{
        address user;
        uint256 userID;
    }

    struct Subscription{
        uint256 subscriptionID;
        uint256 duration;
        uint256 price;
    }

    Subscription[] subscriptions;
    User[] users;


    mapping (address => uint256) public userIDs;

    // @dev mapping (userID to []subscriptionID) for available subscriptions
    mapping (uint256 => uint256[]) public subscriptions_available;

    // @dev mapping (subscriptionID to userID)
    mapping (uint256 => uint256) public subscription_user; 

    // @dev mapping (userID to []subscriptionID) for subscibed to
    mapping (uint256 => uint256[]) public subscribedList;


    function createUser() external{
        address creator = msg.sender;
        require(userIDs[creator] == 0,"User allready created");
        uint256 userID = users.length + 1;
        User memory new_user = User(creator,userID);
        users.push(new_user);
        userIDs[creator] = userID;
    }


    function addSubscription(uint256 duration, uint256 price) external{
        address creator = msg.sender;
        uint256 creatorID = userIDs[creator];
        require(creatorID != 0,"User not created");
        uint256 id = subscriptions.length;
        Subscription memory new_sub = Subscription(id,duration,price);
        subscriptions.push(new_sub);
        subscriptions_available[creatorID].push(id);
        subscription_user[id] = userIDs[creator];
    }

    function subscribe(uint256 subscriptionID) public payable{
        address reader = msg.sender;
        uint256 readerID = userIDs[reader];
        require(readerID != 0,"User not created");
        uint256 creatorID = subscription_user[subscriptionID];
        require(creatorID != 0,"subscription not available");
        Subscription memory sub = subscriptions[subscriptionID];
        require(sub.price == msg.value);
        subscribedList[readerID].push(subscriptionID);
    }

    function getMySubscriptionsAvailable(uint256 userID) public view returns(uint256[] memory){
         return subscriptions_available[userID];
   }
    function getMySubscriptions(uint256 userID) public view returns(uint256[] memory){
         return subscribedList[userID];
   }
       function getSubsctiption(uint256 subsciptionID) public view returns(Subscription memory){
         return subscriptions[subsciptionID];
   }
}