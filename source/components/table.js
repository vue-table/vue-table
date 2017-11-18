export default {
  
  data () {
    return {
      // массив данных
      records: [],
      
      // временное хранилище данных
      stash: {
        name: null,
        amount: null,
        price: null
      },
      
      form: false,
      formError: false,
    };
  },
  
  mounted () {
    // асинхронный запрос к файлу data.json
    fetch('https://vue-table.github.io/data.json')
      .then(response => response.json())
      .then(data => {
        // добавляем все полученные данные в массив
        data.forEach(corrent => {
          // добавляем свойство show со значением true
          // и error со значениме false
          corrent.show = true;
          corrent.error = false;
          this.records.push(corrent);
        });
      });
  },
  
  computed: {
    // вычисляем итог
    totalPrice () {
      let result = 0;
      
      // проходим по всем записям в массиве
      this.records.forEach(record => {
        // умножить цену на кол. товаров
        // и суммируем результат
        result += +record.price * +record.amount;
      });
      
      return result;
    }
  },
  
  methods: {
    // открываем форму для ввода данных
    showForm () {
      this._clearStash (); // очищаем временное хранилище данных
      this._defaultRow(); // устанавливаем все значения по умолчанию
      this.form = true;
    },
    
    // добавляем новые данные в базу - массив
    addForm () {
      // если были заполнены не все поля
      if (!this._allFieldFilled()) {
        
        return this.formError = true; // выводим ошибку
      }
      
      this.records.push({
        name: this.stash.name,
        amount: this.stash.amount,
        price: this.stash.price,
        show: true,
        error: false
      });
      
      this._clearStash (); // очищаем временное хранилище данных
      this._defaultRow(); // устанавливаем все значения по умолчанию
    },
    
    // редактируем строку
    editRow (index) {
      this._defaultRow(); // устанавливаем все значения по умолчанию
      this.records[index].show = false; // прячим текущую строку
      // считываем все данные из базы (массива)
      // во временное хранилище - stash (обьект)
      this.stash.name = this.records[index].name;
      this.stash.amount = this.records[index].amount;
      this.stash.price = this.records[index].price;
    },
    
    // сохранить отредактированные данные
    saveRow (index) {
      // если были заполнены не все поля
      if (!this._allFieldFilled()) {
        
        return this.records[index].error = true; // выводим ошибку
      }
      
      // обновляем данные, извлекая их из временного хранилища
      this.records[index].name = this.stash.name;
      this.records[index].amount = this.stash.amount;
      this.records[index].price = this.stash.price;
      this.records[index].show = true;
      this.records[index].error = false;
    },
    
    // удаляем строку
    deleteRow (index) {
      this._defaultRow(); // устанавливаем все значения по умолчанию
      this.records.splice(index, 1); // удаляем запись из массива
    },
    
    // отмена действий
    cancel () {
      this._clearStash (); // очищаем временное хранилище данных
      this._defaultRow(); // устанавливаем все значения по умолчанию
    },
    
    // очищаем временное хранилище данных
    _clearStash () {
      this.stash.name = null;
      this.stash.amount = null;
      this.stash.price = null;
    },
    
    // устанавливаем все значения по умолчанию
    _defaultRow () {
      this.form = false;
      this.formError = false;
      // проходим по моссиву данных
      this.records.forEach(record => {
        record.show = true; // переключаем все записи из режима редактирования в режим отображения
        record.error = false; // прячем все сообщения об ошибках
      });
    },
    
    // проверяем если были заполнены все поля
    _allFieldFilled () {
      
      return (this.stash.name && this.stash.amount && this.stash.price);
    }
  }
};