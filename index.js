class Survey {
  constructor(app_selector) {
    this.app_area = app_selector,
      this.surveyData = {},
      this.renderStep = "",
      this.surveyHeader = document.createElement('div'),
      this.surveyMain = document.createElement('div')
  }

  // инициализация виджета
  init = () => {
    this.surveyData = this.getSurveyData();
    let headerHtml = `<div class="survey_header__question">${this.surveyData.survey_question}</div><div class="survey_participants">Общее количество проголосовавших: ${this.surveyData.total_number_participants}<div>`;
    this.preparationHmlItem(this.app_area, 'survey_app_wrapper');
    this.preparationHmlItem(this.surveyHeader, 'survey_header', headerHtml);
    this.preparationHmlItem(this.surveyMain, 'survey_main');
    this.handlerAction();
    this.renderStep = 'question_stage';
    this.render();
  }

  // Получение данных для инициализации виджета виджета
  getSurveyData = () => {
    return {
      survey_question: "Кто вы?",
      total_number_participants: 100,
      survey_options: [
        { name: "Интроверт", number_participants: 45, selected: false },
        { name: "Экстраверт", number_participants: 5, selected: false },
        { name: "Не знаю ", number_participants: 50, selected: false }
      ]
    }
  }

  // Навешивание click обработчика
  handlerAction = () => {
    this.surveyMain.addEventListener("click", (e) => {
      let targetItem = e.target;
      if (targetItem.matches(".not_selected")) {
        this.renderStep = 'information_stage';
        this.surveyData.total_number_participants += 1;

        this.surveyData.survey_options = this.surveyData.survey_options.map(item => {
          if (item.name === targetItem.innerHTML) { item.number_participants += 1; item.selected = true } return item
        });


        let headerHtml = `<div class="survey_header__question">${this.surveyData.survey_question}</div><div class="survey_participants">Общее количество проголосовавших: ${this.surveyData.total_number_participants}<div>`;
        this.preparationHmlItem(this.surveyHeader, false, headerHtml);
        this.render();
      };
    });
  }

  // Присвоение классов и/или запись наполнения DOM-элемента
  preparationHmlItem = (item, className, HtmlData) => {
    if (className) {
      item.classList.add(className);
    };

    if (HtmlData) {
      item.innerHTML = HtmlData
    };
  }

  // Рендер виджета, с проверкой на каком этапе мы находимся
  render() {
    this.app_area.innerHTML = '';
    let mainHtml = "";
    this.app_area.appendChild(this.surveyHeader);
    if (this.renderStep === 'question_stage') {
      this.surveyData.survey_options.forEach((item) => {
        mainHtml += `<div class="survey_option not_selected">${item.name}</div>`
      });
    }
    if (this.renderStep === 'information_stage') {
     
      this.surveyData.survey_options.forEach((item) => {
        let calcInterest = (this.surveyData.total_number_participants * item.number_participants) / 100
        mainHtml += `<div class="survey_option selected">${item.name}<span class="interest ${item.selected ? 'selected' : false}" style="width: ${calcInterest}%"></span> <span  class="interest_text ${item.selected ? 'selected' : false}">${item.number_participants} голосов (${calcInterest} %)</span></div>`
      });
    }
    this.surveyMain.innerHTML = mainHtml;
    this.app_area.appendChild(this.surveyMain);
  }
}

let mySurvey = new Survey(document.getElementById('survey'));

document.addEventListener('DOMContentLoaded', mySurvey.init())