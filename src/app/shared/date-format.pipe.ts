import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: 'dateFormat',
})

export class DateFormatPipe implements PipeTransform {
    transform(value: string): string {
        if (value) {
            let date = new Date(value),
                now = new Date(),
                diff = Math.floor((now.getTime() - date.getTime()) / 1000),
                today = new Date(now.getFullYear(), now.getMonth(), now.getDate()),
                yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
            if (!date || !date.getTime()) return '';
            if (date < now) {
                if (diff < 60 * 5) return 'только что';
                if (diff < 60 * 50) return 'недавно';
                if (diff < 60 * 100) return 'час назад';
                if (date > today) return 'сегодня';
                if (date > yesterday) return 'вчера';
            }
            return date.toLocaleDateString();
        } else
            return 'без срока';

    }
}
