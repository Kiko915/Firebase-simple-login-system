/*
const btn = document.querySelector('.btn');

btn.addEventListener('click', () => {
	const box = document.querySelector('.box');
	//check
	if(box.classList.contains('visuallyhidden')) {
		box.classList.remove('visuallyhidden');
		box.addEventListener('transitionend', () => {
			box.classList.add('hidden');
		}, {
			capture: false,
			once: true,
			passive: false
		});
	} else {
		box.classList.remove('hidden');
		setTimeout(() => {
			box.classList.add('visuallyhidden');
		}, 50);
	}
	
})
*/

/*
const modalIn = document.querySelector('.modal');

const signUpModal = document.querySelector('#signupBtn');
signUpModal.addEventListener('click', () => {
	modalIn.classList.add('is-active');	
})

const closeModalBtn = document.querySelector('.close');
closeModalBtn.addEventListener('click', () => {
	modalIn.classList.remove('is-active');
})
*/

//toasts
//const toast = document.querySelector('.toast');
//const toastMsg = toast.querySelector('.toast-msg');
const toastContainer = document.querySelector('.toast-container');
const toastTimer = 5000;

const modalTrigger = document.querySelectorAll('#nav-b-items');

modalTrigger.forEach(trigger => {
	trigger.addEventListener('click', e => {
		const targetModal = trigger.dataset.target;
		switch (targetModal) {
			case 'modal1':
				// statements_1
				const login = document.querySelector('#modal1');
				login.classList.add('is-active');
				console.log('open modal 1');
				break;
			case 'modal2':
				//statement_2
				const signUp = document.querySelector('#modal2');
				signUp.classList.add('is-active');
				console.log('open modal 2');
				break;
			default:
				// statements_def
				console.log('error');
				break;
		}
		console.log(`${e.target.id} has the data-target value of ${trigger.dataset.target}`);
	})
})

//close fn
const closeBtn = document.querySelectorAll('.close');

closeBtn.forEach(btn => {
	btn.addEventListener('click', () => {
		const modal = document.querySelectorAll('.modal');
		modal.forEach(m => {
			m.classList.remove('is-active');
			const formRes = m.querySelector('form');
			setTimeout(() => {
				formRes.reset();
			}, 500);
		})
	})		
})

//sign up call fn 
const signup = document.querySelector('#signUp-f-1');
signup.addEventListener('submit', e => {
	e.preventDefault();

	//get user info
	const name = signup['signupName'].value;
	const email = signup['signupEmail'].value;
	const password = signup['signupPass'].value;
	
	//console.log(name);

	//auth fn
	auth.createUserWithEmailAndPassword(email, password).then(cred => {
		const newUser = cred.user;
		const currentUser = firebase.auth().currentUser;
		console.log(newUser);

		//close modal
		const signupModal = document.querySelector('#modal2');
		signupModal.classList.remove('is-active');
		signup.reset();

		//trigger success msg
		const successMsg = '<strong>Success!</strong> Account has been registered please go to the login section';
		const successToast = document.createElement('div');
		successToast.classList.add('toast', 'success', 'is-on');
		const successContMsg = document.createElement('div');
		successContMsg.classList.add('toast-msg');
		successContMsg.innerHTML = successMsg;

		//append
		toastContainer.appendChild(successToast);
		successToast.appendChild(successContMsg);

		//remove 
		setTimeout(() => {
			successToast.classList.add('fade-out');
			successToast.addEventListener('transitionend', () => {
				successToast.remove();
			})
		}, toastTimer);

		return currentUser.updateProfile({
			displayName: name
		})

	}).catch(err => {
		const errMsg = 'Failed to add account please try again in a couple of minutes or try to refresh the browser.';
		//add toast 
		const errToken = document.createElement('div');
		errToken.classList.add('toast', 'error', 'is-on');
		toastContainer.appendChild(errToken);
		const errTokenMsg = document.createElement('div');
		errTokenMsg.classList.add('toast-msg');
		errTokenMsg.textContent = errMsg;
		errToken.appendChild(errTokenMsg);

		setTimeout(() => {
			errToken.classList.add('fade-out');
			errToken.addEventListener('transitionend', () => {
				errToken.remove();
			})
		}, toastTimer)
	})
})

//log in auth fn 

const loginForm = document.querySelector('#signUp-f-2');
loginForm.addEventListener('submit', e => {
	e.preventDefault();

	const email = loginForm['loginEmail'].value;
	const password = loginForm['loginPass'].value;

	auth.signInWithEmailAndPassword(email, password).then(cred => {

		const user = cred.user;

		const loginModal = document.querySelector('#modal1');
		loginModal.classList.remove('is-active');
		loginForm.reset();

	}).catch(err => {
		const loginModal = document.querySelector('#modal1');
		loginModal.classList.remove('is-active');
		loginForm.reset();
		const errMsg = 'Invalid email or password';
		//alert('yaday(adayada');
		console.log(err.message);

		const errToast = document.createElement('div');
		errToast.classList.add('is-on', 'toast', 'error');
		toastContainer.appendChild(errToast);
		const errToastMsg = document.createElement('div');
		errToastMsg.classList.add('toast-msg');
		errToastMsg.textContent = errMsg;
		errToast.appendChild(errToastMsg);

		setTimeout(() => {
			errToast.classList.add('fade-out');
			errToast.addEventListener('transitionend', () => {
				errToast.remove();
			})
		}, toastTimer);

	})
})



//TODO 
// add auth observer 
// add logout functionality




