var studentApp = angular.module('studentApp', []);
studentApp.controller('studentController', function($scope, $http){

	//On load, run getStudentsFromApi and send it the studnets path
	getStudentsFromApi('/students/default');	

	//On click of the sort button, get the student list from the studetns path
	$scope.sortAlph = function(){
		getStudentsFromApi('/students/sort');	
	}

	//On click of the reverse button, get the student list from the studetns/reverse path
	$scope.reverseSort = function(){
		getStudentsFromApi('/students/reverse');
	}

	//the getStudents function that takes teh URL we are after
	function getStudentsFromApi(urlEnding){
		$http({method: 'GET', url: 'http://localhost:3050'+urlEnding}).then(
			function successCallback(response){
				$scope.studentList = response.data;
			}, function errorCallback(response){
				console.log(response);
				$scope.studentList = response;
			}
		);
	}
});




