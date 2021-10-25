import Vue from 'vue'
import axios from 'axios'

new Vue({
    el: '#app',
    data: {
        students: [],
        search: '',
        piece: '',
        addForm: {
            mark: '',
            group: '',
            isDonePr: false,
            name: '',
        },
        converter: {
            from: '',
            to: '',
            amount: '',
        },
        ccy: [],
    },
    mounted: function () {
        axios.get('http://46.101.212.195:3000/students').then((response) => this.students = response.data)
        axios.get('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5').then((response) => this.ccy = response.data)
    },
    methods: {
        deleteStudent(studId) {
            this.students = this.students.filter(elem => {
                return elem._id != studId;
            });
        },
        addStudent() {
            const id = this.students.length + 1;
            this.students.push({ id, ...this.addForm });
        },
        resultConverter() {
            switch (this.converter.from) {
                case 'EUR':
                    switch (this.converter.to) {
                        case 'USD':
                            this.converter.result = this.converter.amount * this.ccy[1].buy / this.ccy[0].buy
                            break
                        case 'RUB':
                            this.converter.result = this.converter.amount * this.ccy[1].buy / this.ccy[2].buy
                            break;
                        case 'UAH':
                            this.converter.result = this.converter.amount * this.ccy[1].buy
                            break;
                        default:
                            this.converter.result = this.converter.amount
                    }
                    break
                case 'USD':
                    switch (this.converter.to) {
                        case 'EUR':
                            this.converter.result = this.converter.amount * this.ccy[0].buy / this.ccy[1].buy
                            break
                        case 'RUB':
                            this.converter.result = this.converter.amount * this.ccy[0].buy / this.ccy[2].buy
                            break;
                        case 'UAH':
                            this.converter.result = this.converter.amount * this.ccy[0].buy
                            break;
                        default:
                            this.converter.result = this.converter.amount
                    }
                    break
                case 'RUB':
                    switch (this.converter.to) {
                        case 'USD':
                            this.converter.result = this.converter.amount * this.ccy[2].buy / this.ccy[0].buy
                            break
                        case 'EUR':
                            this.converter.result = this.converter.amount * this.ccy[2].buy / this.ccy[1].buy
                            break;
                        case 'UAH':
                            this.converter.result = this.converter.amount * this.ccy[2].buy
                            break;
                        default:
                            this.converter.result = this.converter.amount
                    }
                    break
                case 'UAH':
                    switch (this.converter.to) {
                        case 'USD':
                            this.converter.result = this.converter.amount / this.ccy[0].buy
                            break
                        case 'RUB':
                            this.converter.result = this.converter.amount / this.ccy[2].buy
                            break;
                        case 'EUR':
                            this.converter.result = this.converter.amount / this.ccy[1].buy
                            break;
                        default:
                            this.converter.result = this.converter.amount
                    }
                    break
                default:
            }
        },
    },
}); 