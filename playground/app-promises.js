const users = [{
	id : 1 ,
	name : 'Andrew',
	schoolId : 015
},{
	id : 2 ,
	name : 'adam',
	schoolId : 745
}];


const grades = [{
	id : 1,
	schoolId : 015,
	grade :88
}, {
	id : 2,
	schoolId : 745,
	grade:100
}];

const getUser = (id) => {
    return new Promise((resolve,reject) => {
    	const user = users.find((user) => user.id === id);

    	if(user){
    		resolve(user);
    	}else{
    		reject('unable to find data for this id');
    	}
    });
}

const getGrade = (schoolId) => {
    return new Promise((resolve,reject)=>{
        resolve(grades.find((grades)=> grades.schoolId === schoolId));
    })
}

const getStatus = (id) => {
	let user;
	return getUser(id).then((userTemp)=>{
    user = userTemp;
		return getGrade(user.schoolId);
	}).then((grades) => {
        return `This is ${user.name} and he gets ${grades.grade}`;
	})
}

const getStatusAlt = async (id)=> {
	const user = await getUser(id);
	const grades = await getGrade(user.schoolId);
	return `This is ${user.name} and he gets ${grades.grade}`;
}



getStatusAlt(1).then((gra) => {
	console.log(gra);
}).catch((e) => console.log(e))