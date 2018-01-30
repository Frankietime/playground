var app = angular.module('playground');

app.service('newBoardService', ['$http', '$q', function ($http, $q){
	var service = {};
	var currentBoard = {};
	service.publishNewBoard = function (data, params) {
		var post = $q.defer();
		var res = {};
		if (data != null) {
			currentBoard = data;
			res.data = data;
			res.message = '\nCreator ' + data.creator + '\n' + 'Team: ' + data.team.name;
			post.resolve(res);		
		} else {
			post.reject('data param is null');
		}
		return post.promise;
	};
	service.getCurrentBoard = function () {
		return currentBoard;
	};
	return service;
}]);