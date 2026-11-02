namespace TicTacToeGameForms
{
    partial class frmTicTacToe
    {
        /// <summary>
        /// Variable del diseñador necesaria.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Limpiar los recursos que se estén usando.
        /// </summary>
        /// <param name="disposing">true si los recursos administrados se deben desechar; false en caso contrario.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Código generado por el Diseñador de Windows Forms

        /// <summary>
        /// Método necesario para admitir el Diseñador. No se puede modificar
        /// el contenido de este método con el editor de código.
        /// </summary>
        private void InitializeComponent()
        {
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(frmTicTacToe));
            this.mnuTicTacToe = new System.Windows.Forms.MenuStrip();
            this.mnuFile = new System.Windows.Forms.ToolStripMenuItem();
            this.mnuFileNew = new System.Windows.Forms.ToolStripMenuItem();
            this.mnuFileSeparator1 = new System.Windows.Forms.ToolStripSeparator();
            this.mnuFileExit = new System.Windows.Forms.ToolStripMenuItem();
            this.mnuHelp = new System.Windows.Forms.ToolStripMenuItem();
            this.mnuHelpAbout = new System.Windows.Forms.ToolStripMenuItem();
            this.mnuHelpSeparator1 = new System.Windows.Forms.ToolStripSeparator();
            this.mnuHelpContent = new System.Windows.Forms.ToolStripMenuItem();
            this.mnuView = new System.Windows.Forms.ToolStripMenuItem();
            this.mnuViewScores = new System.Windows.Forms.ToolStripMenuItem();
            this.mnuViewSeparator1 = new System.Windows.Forms.ToolStripSeparator();
            this.mnuViewResetScores = new System.Windows.Forms.ToolStripMenuItem();
            this.grbInformation = new System.Windows.Forms.GroupBox();
            this.lblInformation = new System.Windows.Forms.Label();
            this.picCharater = new System.Windows.Forms.PictureBox();
            this.grbGameLevels = new System.Windows.Forms.GroupBox();
            this.rdbExpert = new System.Windows.Forms.RadioButton();
            this.rdbHard = new System.Windows.Forms.RadioButton();
            this.rdbBeginner = new System.Windows.Forms.RadioButton();
            this.rdbTwoGamers = new System.Windows.Forms.RadioButton();
            this.grbTicTacToe = new System.Windows.Forms.GroupBox();
            this.btnTicTacToe9 = new System.Windows.Forms.Button();
            this.btnTicTacToe8 = new System.Windows.Forms.Button();
            this.btnTicTacToe7 = new System.Windows.Forms.Button();
            this.btnTicTacToe6 = new System.Windows.Forms.Button();
            this.btnTicTacToe5 = new System.Windows.Forms.Button();
            this.btnTicTacToe4 = new System.Windows.Forms.Button();
            this.btnTicTacToe3 = new System.Windows.Forms.Button();
            this.btnTicTacToe2 = new System.Windows.Forms.Button();
            this.btnTicTacToe1 = new System.Windows.Forms.Button();
            this.grbOptions = new System.Windows.Forms.GroupBox();
            this.btnExit = new System.Windows.Forms.Button();
            this.btnNew = new System.Windows.Forms.Button();
            this.mnuTicTacToe.SuspendLayout();
            this.grbInformation.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.picCharater)).BeginInit();
            this.grbGameLevels.SuspendLayout();
            this.grbTicTacToe.SuspendLayout();
            this.grbOptions.SuspendLayout();
            this.SuspendLayout();
            // 
            // mnuTicTacToe
            // 
            this.mnuTicTacToe.Items.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.mnuFile,
            this.mnuHelp,
            this.mnuView});
            this.mnuTicTacToe.Location = new System.Drawing.Point(0, 0);
            this.mnuTicTacToe.Name = "mnuTicTacToe";
            this.mnuTicTacToe.Size = new System.Drawing.Size(304, 24);
            this.mnuTicTacToe.TabIndex = 0;
            this.mnuTicTacToe.Text = "menuStrip1";
            // 
            // mnuFile
            // 
            this.mnuFile.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.mnuFileNew,
            this.mnuFileSeparator1,
            this.mnuFileExit});
            this.mnuFile.Name = "mnuFile";
            this.mnuFile.Size = new System.Drawing.Size(60, 20);
            this.mnuFile.Text = "Archivo";
            // 
            // mnuFileNew
            // 
            this.mnuFileNew.Name = "mnuFileNew";
            this.mnuFileNew.Size = new System.Drawing.Size(109, 22);
            this.mnuFileNew.Text = "Nuevo";
            this.mnuFileNew.Click += new System.EventHandler(this.mnuFileNew_Click);
            // 
            // mnuFileSeparator1
            // 
            this.mnuFileSeparator1.Name = "mnuFileSeparator1";
            this.mnuFileSeparator1.Size = new System.Drawing.Size(106, 6);
            // 
            // mnuFileExit
            // 
            this.mnuFileExit.Name = "mnuFileExit";
            this.mnuFileExit.Size = new System.Drawing.Size(109, 22);
            this.mnuFileExit.Text = "Salir";
            this.mnuFileExit.Click += new System.EventHandler(this.mnuFileExit_Click);
            // 
            // mnuHelp
            // 
            this.mnuHelp.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.mnuHelpAbout,
            this.mnuHelpSeparator1,
            this.mnuHelpContent});
            this.mnuHelp.Name = "mnuHelp";
            this.mnuHelp.Size = new System.Drawing.Size(53, 20);
            this.mnuHelp.Text = "Ayuda";
            // 
            // mnuHelpAbout
            // 
            this.mnuHelpAbout.Name = "mnuHelpAbout";
            this.mnuHelpAbout.Size = new System.Drawing.Size(135, 22);
            this.mnuHelpAbout.Text = "Acerca de...";
            this.mnuHelpAbout.Click += new System.EventHandler(this.mnuHelpAbout_Click);
            // 
            // mnuHelpSeparator1
            // 
            this.mnuHelpSeparator1.Name = "mnuHelpSeparator1";
            this.mnuHelpSeparator1.Size = new System.Drawing.Size(132, 6);
            // 
            // mnuHelpContent
            // 
            this.mnuHelpContent.Name = "mnuHelpContent";
            this.mnuHelpContent.Size = new System.Drawing.Size(135, 22);
            this.mnuHelpContent.Text = "Contenido";
            this.mnuHelpContent.Click += new System.EventHandler(this.mnuHelpContent_Click);
            // 
            // mnuView
            // 
            this.mnuView.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.mnuViewScores,
            this.mnuViewSeparator1,
            this.mnuViewResetScores});
            this.mnuView.Name = "mnuView";
            this.mnuView.Size = new System.Drawing.Size(35, 20);
            this.mnuView.Text = "Ver";
            // 
            // mnuViewScores
            // 
            this.mnuViewScores.Name = "mnuViewScores";
            this.mnuViewScores.Size = new System.Drawing.Size(166, 22);
            this.mnuViewScores.Text = "Puntajes";
            this.mnuViewScores.Click += new System.EventHandler(this.mnuViewScores_Click);
            // 
            // mnuViewSeparator1
            // 
            this.mnuViewSeparator1.Name = "mnuViewSeparator1";
            this.mnuViewSeparator1.Size = new System.Drawing.Size(163, 6);
            // 
            // mnuViewResetScores
            // 
            this.mnuViewResetScores.Name = "mnuViewResetScores";
            this.mnuViewResetScores.Size = new System.Drawing.Size(166, 22);
            this.mnuViewResetScores.Text = "Resetear puntajes";
            this.mnuViewResetScores.Click += new System.EventHandler(this.mnuViewResetScores_Click);
            // 
            // grbInformation
            // 
            this.grbInformation.Controls.Add(this.lblInformation);
            this.grbInformation.Controls.Add(this.picCharater);
            this.grbInformation.Location = new System.Drawing.Point(12, 27);
            this.grbInformation.Name = "grbInformation";
            this.grbInformation.Size = new System.Drawing.Size(280, 117);
            this.grbInformation.TabIndex = 1;
            this.grbInformation.TabStop = false;
            // 
            // lblInformation
            // 
            this.lblInformation.AutoSize = true;
            this.lblInformation.Font = new System.Drawing.Font("Microsoft Sans Serif", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lblInformation.Location = new System.Drawing.Point(107, 49);
            this.lblInformation.Name = "lblInformation";
            this.lblInformation.Size = new System.Drawing.Size(158, 20);
            this.lblInformation.TabIndex = 1;
            this.lblInformation.Text = "Horas de diversión";
            // 
            // picCharater
            // 
            this.picCharater.Image = global::TicTacToeGameForms.Properties.Resources.pocoyo_bailando;
            this.picCharater.Location = new System.Drawing.Point(16, 19);
            this.picCharater.Name = "picCharater";
            this.picCharater.Size = new System.Drawing.Size(85, 79);
            this.picCharater.TabIndex = 0;
            this.picCharater.TabStop = false;
            // 
            // grbGameLevels
            // 
            this.grbGameLevels.Controls.Add(this.rdbExpert);
            this.grbGameLevels.Controls.Add(this.rdbHard);
            this.grbGameLevels.Controls.Add(this.rdbBeginner);
            this.grbGameLevels.Controls.Add(this.rdbTwoGamers);
            this.grbGameLevels.Location = new System.Drawing.Point(12, 150);
            this.grbGameLevels.Name = "grbGameLevels";
            this.grbGameLevels.Size = new System.Drawing.Size(280, 100);
            this.grbGameLevels.TabIndex = 2;
            this.grbGameLevels.TabStop = false;
            this.grbGameLevels.Text = "Niveles de dificultad";
            // 
            // rdbExpert
            // 
            this.rdbExpert.AutoSize = true;
            this.rdbExpert.Location = new System.Drawing.Point(151, 61);
            this.rdbExpert.Name = "rdbExpert";
            this.rdbExpert.Size = new System.Drawing.Size(73, 17);
            this.rdbExpert.TabIndex = 3;
            this.rdbExpert.TabStop = true;
            this.rdbExpert.Text = "Avanzado";
            this.rdbExpert.UseVisualStyleBackColor = true;
            this.rdbExpert.CheckedChanged += new System.EventHandler(this.rdbExpert_CheckedChanged);
            // 
            // rdbHard
            // 
            this.rdbHard.AutoSize = true;
            this.rdbHard.Location = new System.Drawing.Point(16, 61);
            this.rdbHard.Name = "rdbHard";
            this.rdbHard.Size = new System.Drawing.Size(74, 17);
            this.rdbHard.TabIndex = 2;
            this.rdbHard.TabStop = true;
            this.rdbHard.Text = "Intermedio";
            this.rdbHard.UseVisualStyleBackColor = true;
            this.rdbHard.CheckedChanged += new System.EventHandler(this.rdbHard_CheckedChanged);
            // 
            // rdbBeginner
            // 
            this.rdbBeginner.AutoSize = true;
            this.rdbBeginner.Location = new System.Drawing.Point(151, 29);
            this.rdbBeginner.Name = "rdbBeginner";
            this.rdbBeginner.Size = new System.Drawing.Size(80, 17);
            this.rdbBeginner.TabIndex = 1;
            this.rdbBeginner.TabStop = true;
            this.rdbBeginner.Text = "Principiante";
            this.rdbBeginner.UseVisualStyleBackColor = true;
            this.rdbBeginner.CheckedChanged += new System.EventHandler(this.rdbBeginner_CheckedChanged);
            // 
            // rdbTwoGamers
            // 
            this.rdbTwoGamers.AutoSize = true;
            this.rdbTwoGamers.Location = new System.Drawing.Point(16, 29);
            this.rdbTwoGamers.Name = "rdbTwoGamers";
            this.rdbTwoGamers.Size = new System.Drawing.Size(96, 17);
            this.rdbTwoGamers.TabIndex = 0;
            this.rdbTwoGamers.TabStop = true;
            this.rdbTwoGamers.Text = "Dos Jugadores";
            this.rdbTwoGamers.UseVisualStyleBackColor = true;
            this.rdbTwoGamers.CheckedChanged += new System.EventHandler(this.rdbTwoGamers_CheckedChanged);
            // 
            // grbTicTacToe
            // 
            this.grbTicTacToe.Controls.Add(this.btnTicTacToe9);
            this.grbTicTacToe.Controls.Add(this.btnTicTacToe8);
            this.grbTicTacToe.Controls.Add(this.btnTicTacToe7);
            this.grbTicTacToe.Controls.Add(this.btnTicTacToe6);
            this.grbTicTacToe.Controls.Add(this.btnTicTacToe5);
            this.grbTicTacToe.Controls.Add(this.btnTicTacToe4);
            this.grbTicTacToe.Controls.Add(this.btnTicTacToe3);
            this.grbTicTacToe.Controls.Add(this.btnTicTacToe2);
            this.grbTicTacToe.Controls.Add(this.btnTicTacToe1);
            this.grbTicTacToe.Location = new System.Drawing.Point(12, 256);
            this.grbTicTacToe.Name = "grbTicTacToe";
            this.grbTicTacToe.Size = new System.Drawing.Size(280, 271);
            this.grbTicTacToe.TabIndex = 3;
            this.grbTicTacToe.TabStop = false;
            // 
            // btnTicTacToe9
            // 
            this.btnTicTacToe9.Font = new System.Drawing.Font("Ravie", 20.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btnTicTacToe9.Location = new System.Drawing.Point(188, 179);
            this.btnTicTacToe9.Name = "btnTicTacToe9";
            this.btnTicTacToe9.Size = new System.Drawing.Size(80, 74);
            this.btnTicTacToe9.TabIndex = 8;
            this.btnTicTacToe9.Text = "0";
            this.btnTicTacToe9.UseVisualStyleBackColor = true;
            this.btnTicTacToe9.Click += new System.EventHandler(this.btnTicTacToe9_Click);
            // 
            // btnTicTacToe8
            // 
            this.btnTicTacToe8.Font = new System.Drawing.Font("Ravie", 20.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btnTicTacToe8.Location = new System.Drawing.Point(102, 179);
            this.btnTicTacToe8.Name = "btnTicTacToe8";
            this.btnTicTacToe8.Size = new System.Drawing.Size(80, 74);
            this.btnTicTacToe8.TabIndex = 7;
            this.btnTicTacToe8.UseVisualStyleBackColor = true;
            this.btnTicTacToe8.Click += new System.EventHandler(this.btnTicTacToe8_Click);
            // 
            // btnTicTacToe7
            // 
            this.btnTicTacToe7.Font = new System.Drawing.Font("Ravie", 20.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btnTicTacToe7.Location = new System.Drawing.Point(16, 179);
            this.btnTicTacToe7.Name = "btnTicTacToe7";
            this.btnTicTacToe7.Size = new System.Drawing.Size(80, 74);
            this.btnTicTacToe7.TabIndex = 6;
            this.btnTicTacToe7.Text = "X";
            this.btnTicTacToe7.UseVisualStyleBackColor = true;
            this.btnTicTacToe7.Click += new System.EventHandler(this.btnTicTacToe7_Click);
            // 
            // btnTicTacToe6
            // 
            this.btnTicTacToe6.Font = new System.Drawing.Font("Ravie", 20.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btnTicTacToe6.Location = new System.Drawing.Point(188, 99);
            this.btnTicTacToe6.Name = "btnTicTacToe6";
            this.btnTicTacToe6.Size = new System.Drawing.Size(80, 74);
            this.btnTicTacToe6.TabIndex = 5;
            this.btnTicTacToe6.UseVisualStyleBackColor = true;
            this.btnTicTacToe6.Click += new System.EventHandler(this.btnTicTacToe6_Click);
            // 
            // btnTicTacToe5
            // 
            this.btnTicTacToe5.Font = new System.Drawing.Font("Ravie", 20.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btnTicTacToe5.Location = new System.Drawing.Point(102, 99);
            this.btnTicTacToe5.Name = "btnTicTacToe5";
            this.btnTicTacToe5.Size = new System.Drawing.Size(80, 74);
            this.btnTicTacToe5.TabIndex = 4;
            this.btnTicTacToe5.Text = "X";
            this.btnTicTacToe5.UseVisualStyleBackColor = true;
            this.btnTicTacToe5.Click += new System.EventHandler(this.btnTicTacToe5_Click);
            // 
            // btnTicTacToe4
            // 
            this.btnTicTacToe4.Font = new System.Drawing.Font("Ravie", 20.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btnTicTacToe4.Location = new System.Drawing.Point(16, 99);
            this.btnTicTacToe4.Name = "btnTicTacToe4";
            this.btnTicTacToe4.Size = new System.Drawing.Size(80, 74);
            this.btnTicTacToe4.TabIndex = 3;
            this.btnTicTacToe4.Text = "0";
            this.btnTicTacToe4.UseVisualStyleBackColor = true;
            this.btnTicTacToe4.Click += new System.EventHandler(this.btnTicTacToe4_Click);
            // 
            // btnTicTacToe3
            // 
            this.btnTicTacToe3.Font = new System.Drawing.Font("Ravie", 20.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btnTicTacToe3.Location = new System.Drawing.Point(188, 19);
            this.btnTicTacToe3.Name = "btnTicTacToe3";
            this.btnTicTacToe3.Size = new System.Drawing.Size(80, 74);
            this.btnTicTacToe3.TabIndex = 2;
            this.btnTicTacToe3.Text = "X";
            this.btnTicTacToe3.UseVisualStyleBackColor = true;
            this.btnTicTacToe3.Click += new System.EventHandler(this.btnTicTacToe3_Click);
            // 
            // btnTicTacToe2
            // 
            this.btnTicTacToe2.Font = new System.Drawing.Font("Ravie", 20.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btnTicTacToe2.Location = new System.Drawing.Point(102, 19);
            this.btnTicTacToe2.Name = "btnTicTacToe2";
            this.btnTicTacToe2.Size = new System.Drawing.Size(80, 74);
            this.btnTicTacToe2.TabIndex = 1;
            this.btnTicTacToe2.Text = "O";
            this.btnTicTacToe2.UseVisualStyleBackColor = true;
            this.btnTicTacToe2.Click += new System.EventHandler(this.btnTicTacToe2_Click);
            // 
            // btnTicTacToe1
            // 
            this.btnTicTacToe1.Font = new System.Drawing.Font("Ravie", 20.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btnTicTacToe1.Location = new System.Drawing.Point(16, 19);
            this.btnTicTacToe1.Name = "btnTicTacToe1";
            this.btnTicTacToe1.Size = new System.Drawing.Size(80, 74);
            this.btnTicTacToe1.TabIndex = 0;
            this.btnTicTacToe1.Text = "X";
            this.btnTicTacToe1.UseVisualStyleBackColor = true;
            this.btnTicTacToe1.Click += new System.EventHandler(this.btnTicTacToe1_Click);
            // 
            // grbOptions
            // 
            this.grbOptions.Controls.Add(this.btnExit);
            this.grbOptions.Controls.Add(this.btnNew);
            this.grbOptions.Location = new System.Drawing.Point(12, 533);
            this.grbOptions.Name = "grbOptions";
            this.grbOptions.Size = new System.Drawing.Size(280, 65);
            this.grbOptions.TabIndex = 4;
            this.grbOptions.TabStop = false;
            // 
            // btnExit
            // 
            this.btnExit.Location = new System.Drawing.Point(166, 19);
            this.btnExit.Name = "btnExit";
            this.btnExit.Size = new System.Drawing.Size(99, 23);
            this.btnExit.TabIndex = 6;
            this.btnExit.Text = "Salir";
            this.btnExit.UseVisualStyleBackColor = true;
            this.btnExit.Click += new System.EventHandler(this.btnExit_Click);
            // 
            // btnNew
            // 
            this.btnNew.Location = new System.Drawing.Point(16, 19);
            this.btnNew.Name = "btnNew";
            this.btnNew.Size = new System.Drawing.Size(134, 23);
            this.btnNew.TabIndex = 5;
            this.btnNew.Text = "Nuevo";
            this.btnNew.UseVisualStyleBackColor = true;
            this.btnNew.Click += new System.EventHandler(this.btnNew_Click);
            // 
            // frmTicTacToe
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(192)))), ((int)(((byte)(255)))), ((int)(((byte)(255)))));
            this.ClientSize = new System.Drawing.Size(304, 606);
            this.Controls.Add(this.grbOptions);
            this.Controls.Add(this.grbTicTacToe);
            this.Controls.Add(this.grbGameLevels);
            this.Controls.Add(this.grbInformation);
            this.Controls.Add(this.mnuTicTacToe);
            this.Icon = ((System.Drawing.Icon)(resources.GetObject("$this.Icon")));
            this.MainMenuStrip = this.mnuTicTacToe;
            this.Name = "frmTicTacToe";
            this.Text = "Juego del Tres en Raya";
            this.Load += new System.EventHandler(this.frmTicTacToe_Load);
            this.mnuTicTacToe.ResumeLayout(false);
            this.mnuTicTacToe.PerformLayout();
            this.grbInformation.ResumeLayout(false);
            this.grbInformation.PerformLayout();
            ((System.ComponentModel.ISupportInitialize)(this.picCharater)).EndInit();
            this.grbGameLevels.ResumeLayout(false);
            this.grbGameLevels.PerformLayout();
            this.grbTicTacToe.ResumeLayout(false);
            this.grbOptions.ResumeLayout(false);
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.MenuStrip mnuTicTacToe;
        private System.Windows.Forms.ToolStripMenuItem mnuFile;
        private System.Windows.Forms.ToolStripMenuItem mnuFileNew;
        private System.Windows.Forms.ToolStripSeparator mnuFileSeparator1;
        private System.Windows.Forms.ToolStripMenuItem mnuFileExit;
        private System.Windows.Forms.ToolStripMenuItem mnuHelp;
        private System.Windows.Forms.ToolStripMenuItem mnuHelpAbout;
        private System.Windows.Forms.ToolStripSeparator mnuHelpSeparator1;
        private System.Windows.Forms.ToolStripMenuItem mnuHelpContent;
        private System.Windows.Forms.ToolStripMenuItem mnuView;
        private System.Windows.Forms.ToolStripMenuItem mnuViewScores;
        private System.Windows.Forms.ToolStripSeparator mnuViewSeparator1;
        private System.Windows.Forms.ToolStripMenuItem mnuViewResetScores;
        private System.Windows.Forms.GroupBox grbInformation;
        private System.Windows.Forms.Label lblInformation;
        private System.Windows.Forms.PictureBox picCharater;
        private System.Windows.Forms.GroupBox grbGameLevels;
        private System.Windows.Forms.RadioButton rdbExpert;
        private System.Windows.Forms.RadioButton rdbHard;
        private System.Windows.Forms.RadioButton rdbBeginner;
        private System.Windows.Forms.RadioButton rdbTwoGamers;
        private System.Windows.Forms.GroupBox grbTicTacToe;
        private System.Windows.Forms.Button btnTicTacToe9;
        private System.Windows.Forms.Button btnTicTacToe8;
        private System.Windows.Forms.Button btnTicTacToe7;
        private System.Windows.Forms.Button btnTicTacToe6;
        private System.Windows.Forms.Button btnTicTacToe5;
        private System.Windows.Forms.Button btnTicTacToe4;
        private System.Windows.Forms.Button btnTicTacToe3;
        private System.Windows.Forms.Button btnTicTacToe2;
        private System.Windows.Forms.Button btnTicTacToe1;
        private System.Windows.Forms.GroupBox grbOptions;
        private System.Windows.Forms.Button btnExit;
        private System.Windows.Forms.Button btnNew;
    }
}

