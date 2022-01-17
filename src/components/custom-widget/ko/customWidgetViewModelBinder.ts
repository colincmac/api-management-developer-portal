import { Bag } from "@paperbits/common";
import { EventManager, Events } from "@paperbits/common/events";
import { ComponentFlow, IWidgetBinding } from "@paperbits/common/editing";
import { widgetName, widgetDisplayName, widgetEditorSelector } from "../constants";
import { CustomWidgetViewModel } from "./customWidgetViewModel";
import { ViewModelBinder } from "@paperbits/common/widgets";
import { StyleCompiler } from "@paperbits/common/styles";
import { CustomWidgetModel } from "../customWidgetModel";

export class CustomWidgetViewModelBinder implements ViewModelBinder<CustomWidgetModel, CustomWidgetViewModel>  {
    constructor(
        private readonly eventManager: EventManager,
        private readonly styleCompiler: StyleCompiler,
    ) { }

    public async updateViewModel(model: CustomWidgetModel, viewModel: CustomWidgetViewModel, bindingContext: Bag<any>): Promise<void> {
        if (model.styles) {
            viewModel.styles(await this.styleCompiler.getStyleModelAsync(model.styles, bindingContext?.styleManager));
        }

        viewModel.name(model.name);

        let developmentSrc;
        // TODO if in DEV mode only, ignore on prod - could cause a security vulnerability?
        if (true) {
            const key = `cw_${model.uri}_devsrc`;
            const searchParams = new URLSearchParams(window.location.search);
            developmentSrc = searchParams.get(key);
            if (developmentSrc) window.sessionStorage.setItem(key, developmentSrc);
            else developmentSrc = window.sessionStorage.getItem(key);
        }

        const editorValues = {
            customInput1: model.customInput1,
            customInputCodeValue: JSON.parse(model.customInputCodeValue).data,
        };

        viewModel.src((developmentSrc ?? `https://scaffoldtest.blob.core.windows.net/${model.uri}/index.html`) + `?editorValues=${encodeURIComponent(JSON.stringify(editorValues))}`);
    }

    public async modelToViewModel(model: CustomWidgetModel, viewModel?: CustomWidgetViewModel, bindingContext?: Bag<any>): Promise<CustomWidgetViewModel> {
        if (!viewModel) {
            viewModel = new CustomWidgetViewModel();

            const binding: IWidgetBinding<CustomWidgetModel, CustomWidgetViewModel> = {
                name: widgetName,
                displayName: widgetDisplayName,
                readonly: bindingContext ? bindingContext.readonly : false,
                model: model,
                flow: ComponentFlow.Block,
                editor: widgetEditorSelector,
                draggable: true,
                applyChanges: async () => {
                    await this.updateViewModel(model, viewModel, bindingContext);
                    this.eventManager.dispatchEvent(Events.ContentUpdate);
                }
            };

            viewModel["widgetBinding"] = binding;
        }

        this.updateViewModel(model, viewModel, bindingContext);

        return viewModel;
    }

    public canHandleModel(model: CustomWidgetModel): boolean {
        return model instanceof CustomWidgetModel;
    }
}