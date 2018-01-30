var app = angular.module('playground');

app.controller('newBoardModalController',['$uibModalInstance', '$scope', '$log', '$filter', '$location', 'newBoardService', 'teamService',
	function ($uibModalInstance, $scope, $log, $filter, $location, newBoardService, teamService){
	var user = 'myself';
	$scope.newBoard = { name: '' };
	$scope.newTeam = { name: '', bool: true };
	$scope.columnsPluralLabel = 'Columns';
	$scope.columnsSingularLabel = 'Column';
	$scope.invitationsPluralLabel = 'E-mails';
	$scope.invitationsSingularLabel = 'Team Member E-mail';
	$scope.modalTabsId = 'modal-tabs';
	$scope.columns = [{ cantDelete: true },{ cantDelete: true}];
    $scope.invitationEmails = [];
    
    $scope.userTeams = [
		{
            id: 1,
            selected: false,
			name: 'Kickass Team',
			members: [
				{
					userId: 23,
					name: 'Duke Ellington'
				},
				{
					userId: 70,
					name: 'Elvin Jones'
				},
				{
					userId: 14,
					name: 'George Adams'
				}
			]	
		},
		{
            id: 2,
            selected: false,
			name: 'Cool Team',
			members: [
				{
					userId: 23,
					name: 'Jim Hall'
				},
				{
					userId: 70,
					name: 'Paul Desmond'
				},
				{
					userId: 14,
					name: 'Scott Lafaro'
				}
			]	
		}		
    ];   
	$scope.createBoard = function () {
		var selectedTeam = $filter('filter')($scope.userTeams, { selected: true}, true);
		if (selectedTeam.length == 0) {
			selectedTeam = teamService.newTeam($scope.invitationEmails, $scope.newTeam.name, user);
		};
		var data = {
			boardName: $scope.newBoard.name,
			creator: user,
			columns: $scope.columns,
			team: selectedTeam
		};
		var params = {};
		newBoardService.publishNewBoard(data, params).then(function(res) {
			console.log('New board created succesfully. ' + res.message);
			$uibModalInstance.close();
			$location.url('/board');
		}, function (er) {
			console.log(er);
		});
	};
	$scope.cancelBoardModal = function () {
		$uibModalInstance.dismiss('Cancel');
    };
    $scope.createNewTeam = function () {
        $scope.newTeam.bool = true;
        
    };
    $scope.selectTeam = function () {
        $scope.newTeam.bool = false;
    };
}]);