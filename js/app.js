(function (window) {
	'use strict';

	let list = JSON.parse(localStorage.getItem('todoList')) || []


	const vm = new Vue({
		el: '.todoapp',
		data: {
			list,
			todoName: '',
			clickId: -1
		},
		methods: {
			addTodo(){
				this.list.unshift({
					id: +new Date(),
					name: this.todoName,
					iscompleted: false
				})
				// 清空input框
				this.todoName = ''
			},
			delTodo(id){
				// console.log(id);
				let idx = this.list.findIndex(v => v.id === id)
				this.list.splice(idx,1)
			},
			showEdit(id){
				this.clickId = id
			},
			updateTodo(){
				this.clickId = -1
			},
			clearTodo(){
				this.list = this.list.filter(v => !v.iscompleted)
			}
		},
		computed:{
			isShowFooter(){
				return this.list.length > 0
			},
			leftCount(){
				return this.list.filter(v => !v.iscompleted).length
			},
			isShowClear(){
				return this.list.some(v => v.iscompleted)
			}
		},
		watch: {
			list: {
				handler(value){
					localStorage.setItem('todoList',JSON.stringify(value))
				},
				deep: true
			}
		}
	})

	
	window.vm = vm;

})(window);
