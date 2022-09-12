import {Directive, OnInit} from "@angular/core";
// @ts-ignore
import * as feather from "feather-icons/dist/feather.min"

@Directive({selector: '[data-feather]'})
export class FeatherIconDirective implements OnInit {

    ngOnInit(): void {
        // @ts-ignore
        feather.replace({width: 19, height: 19});
    }
}
