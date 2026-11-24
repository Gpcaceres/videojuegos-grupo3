"use strict";
class Walker {
    constructor() {
        this.mMatrix = []; this.mRow = 0; this.mColumn = 0;
        this.mM = 0; this.mN = 0;
        this.mTable = []; this.mElements = []; this.Message = "";
    }
    get Table() { return this.mTable; }
    set Table(value) { this.mTable = value; }
    get Elements() { return this.mElements; }
    set Elements(value) { this.mElements = value; }

    CreateMatrix(r, c) {
this.mMatrix = Array.from({length: r}, () => Array(c).fill(0));
        this.mM = r; this.mN = c;
    }

    InitializeMatrix(a) {

            let i, j;

            for (i = 0; i < this.mM; i++)
            {
                for (j = 0; j < this.mN; j++)
                {
                    this.mMatrix[i][j] = a[i][j];
                }
            }
        
    }

    InitializeRoad() {

            this.mRow = 0; this.mColumn = 0;
        
    }

    LocalizeStart() {

            let i, j;

            for (i = 0; i < this.mM; i++)
            {
                for (j = 0; j < this.mN; j++)
                {
                    if (this.mMatrix[i][j] == 2)
                    {
                        this.mRow = i; this.mColumn = j;
                        return;
                    }
                }
            }
        
    }

    MoveRightSide(picWalker) {

            picWalker.Left = picWalker.Left + 25;
            this.mColumn++;
        
    }

    MoveLeftSide(picWalker) {

            picWalker.Left = picWalker.Left - 25;
            this.mColumn--;
        
    }

    MoveUpSide(picWalker) {

            picWalker.Top = picWalker.Top - 25;
            this.mRow--;
        
    }

    MoveDownSide(picWalker) {

            picWalker.Top = picWalker.Top + 25;
            this.mRow++;
        
    }

    InitializeGrammar() {
this.mTable = ["right", "left", "up", "down"];
        this.mElements = this.mTable;
    }

    ControlMovesInLaberynth(picWalker, e) {

            if (this.mMatrix[this.mRow][this.mColumn] != 3)
            {
                if (e.key == "ArrowRight")
                {
                    if (this.mMatrix[this.mRow][this.mColumn + 1] != 0)
                    {
                        this.MoveRightSide(picWalker);
                    }
                }
                if (e.key == "ArrowLeft")
                {
                    if (this.mMatrix[this.mRow][this.mColumn - 1] != 0)
                    {
                        this.MoveLeftSide(picWalker);
                    }
                }
                if (e.key == "ArrowUp")
                {
                    if (this.mMatrix[this.mRow - 1][this.mColumn] != 0)
                    {
                        this.MoveUpSide(picWalker);
                    }
                }
                if (e.key == "ArrowDown")
                {
                    if (this.mMatrix[this.mRow + 1][this.mColumn] != 0)
                    {
                        this.MoveDownSide(picWalker);
                    }
                }
                if (this.mMatrix[this.mRow][this.mColumn] == 3)
                {
                    this.Message = "Felicitaciones, buen trabajo.";
                }
            }
        
    }

    ControlSpeechMoves(picWalker, txtData, e) {
            
            if (e.Result.Text == "right")
            {
                if (this.mMatrix[this.mRow][this.mColumn + 1] != 0)
                {
                    this.MoveRightSide(picWalker);
                }
            }
            else if (e.Result.Text == "left")
            {
                if (this.mMatrix[this.mRow][this.mColumn - 1] != 0)
                {
                    this.MoveLeftSide(picWalker);
                }
            }
            else if (e.Result.Text == "up")
            {
                if (this.mMatrix[this.mRow - 1][this.mColumn] != 0)
                {
                    this.MoveUpSide(picWalker);
                }
            }
            else if (e.Result.Text == "down")
            {
                if (this.mMatrix[this.mRow + 1][this.mColumn] != 0)
                {
                    this.MoveDownSide(picWalker);
                }
            }
            else
            {
                txtData.Text = txtData.Text + " " + e.Result.Text.toString();
            }            
        
    }
}
