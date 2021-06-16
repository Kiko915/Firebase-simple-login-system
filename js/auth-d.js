const toastContainer = document.querySelector('.toast-container');

const logoutBtn = document.querySelector('#logout-u');
logoutBtn.addEventListener('click', () => {
	auth.signOut().then(() => {
		console.log('user signed out');
	}).catch(err => {
		const errMsg = 'There might have been a problem. Please try to refresh.';

		const toast = document.createElement('div');
		toast.classList.add('is-on', 'toast', 'error');
		toastContainer.appendChild(toast);
		const toastMsg = document.createElement('div');
		toastMsg.textContent = errMsg;
		toastMsg.classList.add('toast-msg');
		toast.appendChild(toastMsg);

		setTimeout(() => {
			toast.classList.add('fade-out');
			toast.addEventListener('transitionend', () => {
				toast.remove();
			})
		}, 5000);
	})
})


//add observer here