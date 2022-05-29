import { browser } from '$app/env';
import { writable } from 'svelte/store';

export const userEmail = writable<string>(
	browser ? window.localStorage.getItem('email') ?? '' : ''
);
export const userName = writable<string>(browser ? window.localStorage.getItem('name') ?? '' : '');
export const userLink = writable<string>(browser ? window.localStorage.getItem('link') ?? '' : '');

userEmail.subscribe((value) => {
	if (browser) window.localStorage.setItem('email', value);
});
userName.subscribe((value) => {
	if (browser) window.localStorage.setItem('name', value);
});
userLink.subscribe((value) => {
	if (browser) window.localStorage.setItem('link', value);
});
