(function() {

	'use strict';

	angular
		.module('mainController', [])
		.controller('mainController', mainController)
		.service('Beer', function($resource) {
			return $resource('http://localhost:3000/api/beers/:id', {id: '@_id'}, {
				update: {
					method: 'PUT'
				}
			})
		});


	function mainController(Beer, $scope) {

		this.newBeer = {};
		this.beers = Beer.query();
	}

})();




// function mainController() {
// 	this.test = "Hello";
  // this.beers = Beer.query();
// }
// (function() {

// 	'use strict';

// 	console.log("MAIN CONTROLLER");

// 	angular
// 		.module('peertapp', ['ngResouce'])
// 		.controller('mainController', function mainController($scope) {
// 			console.log("MAIN CONTROLLER WORKING")
// 		});
// })();


// 	angular
// 		.module('peertapp', ['ngResouce'])
// 		.service('Beer', function($resource) {
//   		return $resource('http://localhost:3000/api/beers/:id', { id: '@_id' }, {
//   			update: {
//     			method: 'PUT' // this method issues a PUT request
//   			}
//   		});
// 		}).controller('mainController', function mainController(Beer, $scope) {
// 			this.newBeer = {};
// 	    this.beers = Beer.query();
// 		});







// 		function mainController(Beer, $scope, $http) {
// 			this.newBeer = {};
// 		    this.beers = Beer.query();
// 		    this.createBeer = createBeer;
// 		    this.updateBeer = updateBeer;
// 		    this.deleteBeer = deleteBeer;
// 		    this.incrementUpvotes = incrementUpvotes;
// 		    // this.newComment ={};
// 		    // this.comments = Comment.query();
// 		    // this.createComment = createComment;

// 		function updateBeer(beer) {
// 			console.log('updating3');
// 		    Beer.update({id: beer._id}, beer);
// 		    this.displayEditForm = false;
// 	  	}

// 	  	function incrementUpvotes(beer){
// 	      console.log('incrementing');
// 	      beer.upvotes += 1;
// 	      Beer.update({id: beer._id}, beer);
// 	      // console.log(beer.upvotes);
// 	    }

// 		 function createBeer(){
// 		 	console.log('incrementing2');
// 		      Beer.save(this.newBeer);
// 		      this.beers.push(this.newBeer);
// 		      this.newBeer = {};
// 		      console.log('saved');
// 		 }

// 	  	function deleteBeer(beer) {
// 		  	console.log("deleting", beer._id);
// 		    Beer.remove({id:beer._id});
// 		    var beerdIndex = this.beers.indexOf(beer);
// 		    this.beers.splice(beersIndex, 1);
// 	  	}

// 	    function createComment(beer) {
// 	      this.newComment.beerId = beer._id;
// 	      Comment.save(this.newComment);
// 	      this.comments.push(this.newComment);
// 	      this.newComment = {};
// 	      console.log('saved comment');
// 	    }
// }	

// })();