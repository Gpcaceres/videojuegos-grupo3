namespace WinAppTicTacToe
{
    partial class frmTicTacToe
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(frmTicTacToe));
            this.btnNew = new System.Windows.Forms.Button();
            this.grbOptions = new System.Windows.Forms.GroupBox();
            this.btnExit = new System.Windows.Forms.Button();
            this.btnTicTacToe9 = new System.Windows.Forms.Button();
            this.btnTicTacToe8 = new System.Windows.Forms.Button();
            this.btnTicTacToe7 = new System.Windows.Forms.Button();
            this.btnTicTacToe6 = new System.Windows.Forms.Button();
            this.btnTicTacToe5 = new System.Windows.Forms.Button();
            this.btnTicTacToe4 = new System.Windows.Forms.Button();
            this.btnTicTacToe3 = new System.Windows.Forms.Button();
            this.btnTicTacToe2 = new System.Windows.Forms.Button();
            this.btnTicTacToe1 = new System.Windows.Forms.Button();
            this.grbTicTacToe = new System.Windows.Forms.GroupBox();
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
            this.picCharacter = new System.Windows.Forms.PictureBox();
            this.grbOptions.SuspendLayout();
            this.grbTicTacToe.SuspendLayout();
            this.mnuTicTacToe.SuspendLayout();
            this.grbInformation.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.picCharacter)).BeginInit();
            this.SuspendLayout();
            // 
            // btnNew
            // 
            this.btnNew.Location = new System.Drawing.Point(30, 19);
            this.btnNew.Name = "btnNew";
            this.btnNew.Size = new System.Drawing.Size(88, 23);
            this.btnNew.TabIndex = 0;
            this.btnNew.Text = "Nuevo";
            this.btnNew.UseVisualStyleBackColor = true;
            this.btnNew.Click += new System.EventHandler(this.btnNew_Click);
            // 
            // grbOptions
            // 
            this.grbOptions.Controls.Add(this.btnExit);
            this.grbOptions.Controls.Add(this.btnNew);
            this.grbOptions.Location = new System.Drawing.Point(10, 363);
            this.grbOptions.Name = "grbOptions";
            this.grbOptions.Size = new System.Drawing.Size(259, 52);
            this.grbOptions.TabIndex = 9;
            this.grbOptions.TabStop = false;
            // 
            // btnExit
            // 
            this.btnExit.Location = new System.Drawing.Point(135, 19);
            this.btnExit.Name = "btnExit";
            this.btnExit.Size = new System.Drawing.Size(87, 23);
            this.btnExit.TabIndex = 1;
            this.btnExit.Text = "Salir";
            this.btnExit.UseVisualStyleBackColor = true;
            this.btnExit.Click += new System.EventHandler(this.btnExit_Click);
            // 
            // btnTicTacToe9
            // 
            this.btnTicTacToe9.Font = new System.Drawing.Font("Ravie", 20.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btnTicTacToe9.Location = new System.Drawing.Point(162, 151);
            this.btnTicTacToe9.Name = "btnTicTacToe9";
            this.btnTicTacToe9.Size = new System.Drawing.Size(60, 60);
            this.btnTicTacToe9.TabIndex = 8;
            this.btnTicTacToe9.Text = "0";
            this.btnTicTacToe9.UseVisualStyleBackColor = true;
            this.btnTicTacToe9.Click += new System.EventHandler(this.btnTicTacToe9_Click);
            // 
            // btnTicTacToe8
            // 
            this.btnTicTacToe8.Font = new System.Drawing.Font("Ravie", 20.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btnTicTacToe8.Location = new System.Drawing.Point(96, 151);
            this.btnTicTacToe8.Name = "btnTicTacToe8";
            this.btnTicTacToe8.Size = new System.Drawing.Size(60, 60);
            this.btnTicTacToe8.TabIndex = 7;
            this.btnTicTacToe8.UseVisualStyleBackColor = true;
            this.btnTicTacToe8.Click += new System.EventHandler(this.btnTicTacToe8_Click);
            // 
            // btnTicTacToe7
            // 
            this.btnTicTacToe7.Font = new System.Drawing.Font("Ravie", 20.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btnTicTacToe7.Location = new System.Drawing.Point(30, 151);
            this.btnTicTacToe7.Name = "btnTicTacToe7";
            this.btnTicTacToe7.Size = new System.Drawing.Size(60, 60);
            this.btnTicTacToe7.TabIndex = 6;
            this.btnTicTacToe7.Text = "X";
            this.btnTicTacToe7.UseVisualStyleBackColor = true;
            this.btnTicTacToe7.Click += new System.EventHandler(this.btnTicTacToe7_Click);
            // 
            // btnTicTacToe6
            // 
            this.btnTicTacToe6.Font = new System.Drawing.Font("Ravie", 20.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btnTicTacToe6.Location = new System.Drawing.Point(162, 85);
            this.btnTicTacToe6.Name = "btnTicTacToe6";
            this.btnTicTacToe6.Size = new System.Drawing.Size(60, 60);
            this.btnTicTacToe6.TabIndex = 5;
            this.btnTicTacToe6.Text = "0";
            this.btnTicTacToe6.UseVisualStyleBackColor = true;
            this.btnTicTacToe6.Click += new System.EventHandler(this.btnTicTacToe6_Click);
            // 
            // btnTicTacToe5
            // 
            this.btnTicTacToe5.Font = new System.Drawing.Font("Ravie", 20.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btnTicTacToe5.Location = new System.Drawing.Point(96, 85);
            this.btnTicTacToe5.Name = "btnTicTacToe5";
            this.btnTicTacToe5.Size = new System.Drawing.Size(60, 60);
            this.btnTicTacToe5.TabIndex = 4;
            this.btnTicTacToe5.Text = "X";
            this.btnTicTacToe5.UseVisualStyleBackColor = true;
            this.btnTicTacToe5.Click += new System.EventHandler(this.btnTicTacToe5_Click);
            // 
            // btnTicTacToe4
            // 
            this.btnTicTacToe4.Font = new System.Drawing.Font("Ravie", 20.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btnTicTacToe4.Location = new System.Drawing.Point(30, 85);
            this.btnTicTacToe4.Name = "btnTicTacToe4";
            this.btnTicTacToe4.Size = new System.Drawing.Size(60, 60);
            this.btnTicTacToe4.TabIndex = 3;
            this.btnTicTacToe4.UseVisualStyleBackColor = true;
            this.btnTicTacToe4.Click += new System.EventHandler(this.btnTicTacToe4_Click);
            // 
            // btnTicTacToe3
            // 
            this.btnTicTacToe3.Font = new System.Drawing.Font("Ravie", 20.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btnTicTacToe3.Location = new System.Drawing.Point(162, 19);
            this.btnTicTacToe3.Name = "btnTicTacToe3";
            this.btnTicTacToe3.Size = new System.Drawing.Size(60, 60);
            this.btnTicTacToe3.TabIndex = 2;
            this.btnTicTacToe3.Text = "0";
            this.btnTicTacToe3.UseVisualStyleBackColor = true;
            this.btnTicTacToe3.Click += new System.EventHandler(this.btnTicTacToe3_Click);
            // 
            // btnTicTacToe2
            // 
            this.btnTicTacToe2.Font = new System.Drawing.Font("Ravie", 20.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btnTicTacToe2.Location = new System.Drawing.Point(96, 19);
            this.btnTicTacToe2.Name = "btnTicTacToe2";
            this.btnTicTacToe2.Size = new System.Drawing.Size(60, 60);
            this.btnTicTacToe2.TabIndex = 1;
            this.btnTicTacToe2.UseVisualStyleBackColor = true;
            this.btnTicTacToe2.Click += new System.EventHandler(this.btnTicTacToe2_Click);
            // 
            // btnTicTacToe1
            // 
            this.btnTicTacToe1.Font = new System.Drawing.Font("Ravie", 19.8F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btnTicTacToe1.Location = new System.Drawing.Point(30, 19);
            this.btnTicTacToe1.Name = "btnTicTacToe1";
            this.btnTicTacToe1.Size = new System.Drawing.Size(60, 60);
            this.btnTicTacToe1.TabIndex = 0;
            this.btnTicTacToe1.Text = "X";
            this.btnTicTacToe1.UseVisualStyleBackColor = true;
            this.btnTicTacToe1.Click += new System.EventHandler(this.btnTicTacToe1_Click);
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
            this.grbTicTacToe.Location = new System.Drawing.Point(9, 132);
            this.grbTicTacToe.Name = "grbTicTacToe";
            this.grbTicTacToe.Size = new System.Drawing.Size(259, 225);
            this.grbTicTacToe.TabIndex = 8;
            this.grbTicTacToe.TabStop = false;
            // 
            // mnuTicTacToe
            // 
            this.mnuTicTacToe.ImageScalingSize = new System.Drawing.Size(20, 20);
            this.mnuTicTacToe.Items.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.mnuFile,
            this.mnuHelp,
            this.mnuView});
            this.mnuTicTacToe.Location = new System.Drawing.Point(0, 0);
            this.mnuTicTacToe.Name = "mnuTicTacToe";
            this.mnuTicTacToe.Padding = new System.Windows.Forms.Padding(4, 2, 0, 2);
            this.mnuTicTacToe.Size = new System.Drawing.Size(279, 24);
            this.mnuTicTacToe.TabIndex = 5;
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
            // 
            // grbInformation
            // 
            this.grbInformation.Controls.Add(this.lblInformation);
            this.grbInformation.Controls.Add(this.picCharacter);
            this.grbInformation.Location = new System.Drawing.Point(9, 30);
            this.grbInformation.Name = "grbInformation";
            this.grbInformation.Size = new System.Drawing.Size(259, 95);
            this.grbInformation.TabIndex = 6;
            this.grbInformation.TabStop = false;
            // 
            // lblInformation
            // 
            this.lblInformation.AutoSize = true;
            this.lblInformation.Font = new System.Drawing.Font("Microsoft Sans Serif", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lblInformation.Location = new System.Drawing.Point(76, 45);
            this.lblInformation.Name = "lblInformation";
            this.lblInformation.Size = new System.Drawing.Size(158, 20);
            this.lblInformation.TabIndex = 1;
            this.lblInformation.Text = "Horas de diversión";
            // 
            // picCharacter
            // 
            this.picCharacter.Image = ((System.Drawing.Image)(resources.GetObject("picCharacter.Image")));
            this.picCharacter.Location = new System.Drawing.Point(6, 19);
            this.picCharacter.Name = "picCharacter";
            this.picCharacter.Size = new System.Drawing.Size(64, 64);
            this.picCharacter.TabIndex = 0;
            this.picCharacter.TabStop = false;
            // 
            // frmTicTacToe
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(279, 420);
            this.Controls.Add(this.grbOptions);
            this.Controls.Add(this.grbTicTacToe);
            this.Controls.Add(this.mnuTicTacToe);
            this.Controls.Add(this.grbInformation);
            this.Icon = ((System.Drawing.Icon)(resources.GetObject("$this.Icon")));
            this.Margin = new System.Windows.Forms.Padding(2);
            this.Name = "frmTicTacToe";
            this.Text = "Tic-Tac-Toe";
            this.Load += new System.EventHandler(this.frmTicTacToe_Load);
            this.grbOptions.ResumeLayout(false);
            this.grbTicTacToe.ResumeLayout(false);
            this.mnuTicTacToe.ResumeLayout(false);
            this.mnuTicTacToe.PerformLayout();
            this.grbInformation.ResumeLayout(false);
            this.grbInformation.PerformLayout();
            ((System.ComponentModel.ISupportInitialize)(this.picCharacter)).EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Button btnNew;
        private System.Windows.Forms.GroupBox grbOptions;
        private System.Windows.Forms.Button btnExit;
        private System.Windows.Forms.Button btnTicTacToe9;
        private System.Windows.Forms.Button btnTicTacToe8;
        private System.Windows.Forms.Button btnTicTacToe7;
        private System.Windows.Forms.Button btnTicTacToe6;
        private System.Windows.Forms.Button btnTicTacToe5;
        private System.Windows.Forms.Button btnTicTacToe4;
        private System.Windows.Forms.Button btnTicTacToe3;
        private System.Windows.Forms.Button btnTicTacToe2;
        private System.Windows.Forms.Button btnTicTacToe1;
        private System.Windows.Forms.GroupBox grbTicTacToe;
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
        private System.Windows.Forms.PictureBox picCharacter;
    }
}

