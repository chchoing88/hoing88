/**
 * Created by merlin.ho on 2017. 6. 10..
 */
var Conference = Conference || {};

Conference.memoizedRestaurantApi = function(thirdPartyApi){
  'use strict';

  var api = thirdPartyApi,
    cache = [];

  return {
    getRestaurantsNearConference: function(cuisine){
      if(cache.hasOwnProperty(cuisine)){
        return cache[cuisine];
      }

      var returnPromise = api.getRestaurantsNearConference(cuisine);

      cache[cuisine] = returnPromise;
      return returnPromise;
    }
  }
};
