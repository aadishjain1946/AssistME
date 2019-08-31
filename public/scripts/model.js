app.factory("myfactory", ($q, $http) => {
    return {
        sendimg: (src1) => {
            var defer = $q.defer();
            $http.post('/sendimg', { data: src1 }).then(data => {
                defer.resolve(data);
            }), (err) => {
                defer.reject(data);
            }
            return defer.promise;
        }

    }
})