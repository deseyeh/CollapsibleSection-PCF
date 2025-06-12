import Collapse, { ICollapseProps } from "./Collapsible";
import { IInputs, IOutputs } from "./generated/ManifestTypes";
import * as React from "react";

export class Collapsible implements ComponentFramework.ReactControl<IInputs, IOutputs> {
    private theComponent: ComponentFramework.ReactControl<IInputs, IOutputs>;
    private notifyOutputChanged: () => void;
    private context: ComponentFramework.Context<IInputs>;
    
    private collapsedByDefault: boolean
    private collapsibleToggle: boolean
    private label: string
    private textSize: number
    private textWeight: string
    private textpadding: string
    private textColor: string
    private backgroundColor: string
    private hoverColor: string
    private fieldLogicalNames: string
    private leftIcon: string
    private outputValue: boolean


    /**
     * Empty constructor.
     */
    constructor() { }

    /**
     * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
     * Data-set values are not initialized here, use updateView.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
     * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
     * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
     */
    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary
    ): void {
        this.notifyOutputChanged = notifyOutputChanged;
        this.context = context
        this.collapsedByDefault = context.parameters.collapsedByDefault?.raw
        this.collapsibleToggle = this.collapsedByDefault?this.collapsedByDefault: context.parameters.collapsibleToggle?.raw
        this.label = context.parameters.label?.raw ?? "Collapsible"
        this.textSize = context.parameters.textSize?.raw ?? 14
        this.textWeight = context.parameters.textWeight?.raw??"normal"
        this.textColor = context.parameters.textColor?.raw??"black"
        this.backgroundColor = context.parameters.backgroundColor?.raw??"white"
        this.hoverColor = context.parameters.hoverColor?.raw ?? "#f7f7f7"
        this.textpadding = context.parameters.textPadding?.raw ?? "10px 5px"
        this.fieldLogicalNames = context.parameters.fieldLogicalNames?.raw ?? ""
        this.leftIcon = context.parameters.leftIcon?.raw ?? ""
        this.outputValue = this.collapsibleToggle

        // Default State
        this.handleHideFields(this.collapsibleToggle)

        console.log("init "+ this.outputValue)
    }

    public handleHideFields(currentState:boolean): void {

         if (this.fieldLogicalNames) {
            if (typeof Xrm !== "undefined") {
           
                const fieldsToHide = this.fieldLogicalNames.split(",").map(field => field.trim())
                console.log(fieldsToHide)
               
                fieldsToHide.forEach(fields => {
                    // eslint-disable-next-line no-undef
                    const thisfield = Xrm.Page.getControl(fields) as Xrm.Controls.StandardControl | null;
                    thisfield?.setVisible(!currentState);  
                    console.log(fields + "v1") 
                    // eslint-disable-next-line no-undef
                    console.log( Xrm.Page.getControl(fields)?.getVisible() ) 
                })
                
            }
        }
    }



    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     * @returns ReactElement root react element for the control
     */
    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {
      
        const props: ICollapseProps = {
            name: this.label,
            isClosed: this.collapsibleToggle,
            textWeight: this.textWeight,
            textColor: this.textColor,
            bgColor: this.backgroundColor,
            hoverColor: this.hoverColor,
            textPadding: this.textpadding,
            leftIcon: this.leftIcon,
            textSize: this.textSize,
            hideFields: (currentState) => {

                this.notifyOutputChanged()
                this.outputValue = currentState
                console.log("after notify "+ currentState)

                this.handleHideFields(currentState)
            }
           };
        return React.createElement(
            Collapse, props
        );

    }

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
     */
    public getOutputs(): IOutputs {
        return {
            collapsibleToggle: this.outputValue,
            outputValue: this.outputValue
         };
    }

    /**
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
     * i.e. cancelling any pending remote calls, removing listeners, etc.
     */
    public destroy(): void {
        // Add code to cleanup control if necessary
    }
}
