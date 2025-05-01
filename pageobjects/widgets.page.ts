import Page from './page';
import { expect } from 'chai';

export class WidgetsPage extends Page {

  // Auto Complete
  public get multiColorInput() { return $('#autoCompleteMultipleInput'); }
  public get singleColorInput() { return $('#autoCompleteSingleInput'); }

  public get multiColorTags() { return $$('.css-12jo7m5.auto-complete__multi-value__label'); }
  public get multiColorRemoveButtons() { return $$('.css-xb97g8.auto-complete__multi-value__remove'); }

  public get singleSelectedColor() { return $('.css-1uccc91-singleValue'); }
  // Date Picker locators
  public get dateInput() { return $('#datePickerMonthYearInput'); }
  public get dateTimeInput() { return $('#dateAndTimePickerInput'); }

// Calendar UI elements
  public get calendarMonthDropdown() { return $('.react-datepicker__month-select'); }
  public get calendarYearDropdown() { return $('.react-datepicker__year-select'); }
  public get calendarDay15() { return $('.react-datepicker__day--015'); }
  public get sliderInput() { return $('#sliderValue'); }
  public get sliderHandle() { return $('.range-slider'); }

  // Progress Bar
  public get progressBarStartButton() { return $('#startStopButton'); }
  public get progressBarResetButton() { return $('#resetButton'); }
  public get progressBarFill() { return $('#progressBar'); }

  // Methods
  public async openAccordionSection(index: number): Promise<void> {
    const section = await $(`#section${index}Heading`);
    await section.scrollIntoView();
    await section.click();
  }

  public async waitForAccordionContentDisplayed(index: number): Promise<void> {
    const content = await $(`#section${index}Content`);
    await content.waitForDisplayed({ timeout: 5000 });
  }

  public async isAccordionContentDisplayed(index: number): Promise<boolean> {
    const content = await $(`#section${index}Content`);
    return await content.isDisplayed();
  }

  public async getAccordionContentText(index: number): Promise<string> {
    const content = await $(`#section${index}Content`);
    return (await content.getText()).trim();
  }

  public async validateAllAccordionSections(): Promise<void> {
    for (const index of [1, 2, 3] as const) {
      if (index !== 1) {
        await this.openAccordionSection(index);
        await this.waitForAccordionContentDisplayed(index);
      }
      const isDisplayed = await this.isAccordionContentDisplayed(index);
      expect(isDisplayed).to.be.true;
      const text = await this.getAccordionContentText(index);
      expect(text.length).to.be.greaterThan(0);
    }
  }

  public async enterMultiSelectColors(colors: string[]): Promise<void> {
    for (const color of colors) {
      await this.multiColorInput.setValue(color);
      await browser.keys('Enter');
    }
  }

  public async getSelectedMultiColors(): Promise<string[]> {
    const tags = await this.multiColorTags;
    const values: string[] = [];
    for (const tag of tags) {
      const text = (await tag.getText()).trim();
      values.push(text);
    }
    return values;
  }

  public async removeMultiColor(color: string): Promise<void> {
    const tags = await this.multiColorTags;
    const removes = await this.multiColorRemoveButtons;
    for (let i = 0; i < tags.length; i++) {
      const text = await tags[i].getText();
      if (text === color) {
        await removes[i].click();
        return;
      }
    }
  }

  public async enterSingleSelectColor(color: string): Promise<void> {
    await this.singleColorInput.setValue(color);
    await browser.keys('Enter');
  }

  public async getSelectedSingleColor(): Promise<string> {
    return (await this.singleSelectedColor.getText()).trim();
  }
public async enterDate(date: string): Promise<void> {
  await this.dateInput.click();
  await browser.pause(100);
  await browser.keys(['Control', 'a']);
  await browser.keys('Backspace');
  await browser.pause(100);
  await browser.keys(date.split(''));
}

public async getDateValue(): Promise<string> {
  return (await this.dateInput.getValue()).trim();
}

public async openDatePicker(): Promise<void> {
  await this.dateInput.click();
}

public async pickDateViaUI(): Promise<void> {
  await this.dateInput.clearValue();
  await this.openDatePicker();
  await this.calendarMonthDropdown.selectByVisibleText('May');
  await this.calendarYearDropdown.selectByVisibleText('2020');
  await this.calendarDay15.click();
}

public async enterDateTime(dateTime: string): Promise<void> {
  const input = await $('#dateAndTimePickerInput');
  await input.clearValue();
  await input.setValue(dateTime);
}

public async getDateTimeValue(): Promise<string> {
  return (await this.dateTimeInput.getValue()).trim();
}
public async moveSliderTo(target: number): Promise<void> {
  await this.sliderHandle.scrollIntoView();
  await this.sliderHandle.click();
  let current = await this.getSliderValue();
  while (current !== target) {
    if (current < target) {
      await browser.keys('ArrowRight');
    } else {
      await browser.keys('ArrowLeft');
    }
    current = await this.getSliderValue();
  }
}
public async getSliderValue(): Promise<number> {
  const value = await this.sliderInput.getValue();
  return parseInt(value, 10);
}
  public async startProgressBar(): Promise<void> {
  await this.progressBarStartButton.click();
}

public async waitForProgressToReach(targetPercent: number, timeout = 15000): Promise<void> {
  await browser.waitUntil(async () => {
    const progressText = await this.progressBarFill.getText();
    const current = parseInt(progressText.replace('%', ''), 10);
    return current >= targetPercent;
  }, { timeout, timeoutMsg: `Progress bar did not reach ${targetPercent}% in time` });
}

public async resetProgressBar(): Promise<void> {
  await this.progressBarResetButton.click();
}

public async getProgressBarValue(): Promise<number> {
  const progressText = await this.progressBarFill.getText();
  return parseInt(progressText.replace('%', ''), 10);
}

}

export const widgetsPage = new WidgetsPage();