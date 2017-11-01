;Electronic Field Guide Installer Script
;Written by Daniel McNeil, R.S.

;--------------------------------
;Include Modern UI

  !include "MUI2.nsh"

;--------------------------------
;General

  ;Name and file
  Name "West Virginia Electronic Field Guide"
  OutFile "electronic-field-guide-6.0.2.1-ia32.exe"

  ;Default installation folder
  InstallDir "c:\electronic-field-guide"

  ;Get installation folder from registry if available
  InstallDirRegKey HKCU "Software\electronic-field-guide" "Install_Dir"

  ;Request application privileges for Windows Vista
  RequestExecutionLevel user

;--------------------------------
;Interface Settings

  !define MUI_ABORTWARNING
  !define MUI_ICON "NSIS\icon.ico"
  !define MUI_UICON "NSIS\uninstall.ico"
  !define MUI_WELCOMEPAGE_TITLE_3LINES
  !define MUI_WELCOMEFINISHPAGE_BITMAP "NSIS\side.bmp"
  !define MUI_UNWELCOMEFINISHPAGE_BITMAP "NSIS\side.bmp"
  !define MUI_LICENSEPAGE_CHECKBOX
  !define MUI_LICENSEPAGE_CHECKBOX_TEXT "I accept the license agreement."

;--------------------------------
;Pages

  !insertmacro MUI_PAGE_WELCOME
  !insertmacro MUI_PAGE_LICENSE "NSIS\license.txt"
  !insertmacro MUI_PAGE_COMPONENTS
  !insertmacro MUI_PAGE_DIRECTORY
  !insertmacro MUI_PAGE_INSTFILES
  !insertmacro MUI_PAGE_FINISH

  !insertmacro MUI_UNPAGE_WELCOME
  !insertmacro MUI_UNPAGE_CONFIRM
  !insertmacro MUI_UNPAGE_INSTFILES
  !insertmacro MUI_UNPAGE_FINISH

;--------------------------------
;Languages

  !insertmacro MUI_LANGUAGE "English"

;--------------------------------
;Installer Sections

Section "electronic-field-guide" files

  SectionIn RO
  
  SetOutPath "$INSTDIR"
  
  Delete "$INSTDIR\*.*"

  RMDir "$INSTDIR"

  ;ADD YOUR OWN FILES HERE...
  File /r "electronic-field-guide-win32-ia32\*"

  ;Store installation folder
  WriteRegStr HKCU "Software\electronic-field-guide" "" $INSTDIR

  ;Create uninstaller
  WriteUninstaller "$INSTDIR\Uninstall.exe"

SectionEnd

Section "Create Start Menu Group" start

  CreateDirectory "$SMPROGRAMS\Electronic Field Guide"
  CreateShortCut "$SMPROGRAMS\Electronic Field Guide\Electronic Field Guide.lnk" "$INSTDIR\electronic-field-guide.exe" "" "$INSTDIR\electronic-field-guide.exe" 0
  CreateShortCut "$SMPROGRAMS\Electronic Field Guide\Uninstall.lnk" "$INSTDIR\uninstall.exe" "" "$INSTDIR\uninstall.exe" 0
  
SectionEnd

Section "Create Desktop Shortcut" desk

  CreateShortCut "$Desktop\Electronic Field Guide.lnk "$INSTDIR\electronic-field-guide.exe" "" "$INSTDIR\electronic-field-guide.exe" 0
  
 SectionEnd

;--------------------------------
;Descriptions

  ;Language strings
  LangString DESC_files ${LANG_ENGLISH} "Core files for the Electronic Field Guide"
  LangString DESC_start ${LANG_ENGLISH} "Create a Start Menu Group for the Electronic Field Guide"
  LangString DESC_desk ${LANG_ENGLISH} "Create a shortcut for the Electronic Field Guide on the Desktop"
  
  ;Assign language strings to sections
  !insertmacro MUI_FUNCTION_DESCRIPTION_BEGIN
  !insertmacro MUI_DESCRIPTION_TEXT ${files} $(DESC_files)
	!insertmacro MUI_DESCRIPTION_TEXT ${start} $(DESC_start)
	!insertmacro MUI_DESCRIPTION_TEXT ${desk} $(DESC_desk)
  !insertmacro MUI_FUNCTION_DESCRIPTION_END

;--------------------------------

;Version Information

  VIProductVersion "6.0.1.1"
  VIAddVersionKey /LANG=${LANG_ENGLISH} "ProductName" "West Virginia Electronic Field Guide"
  VIAddVersionKey /LANG=${LANG_ENGLISH} "Type" "Application - Installer"
  VIAddVersionKey /LANG=${LANG_ENGLISH} "CompanyName" "Smellydog Coding"
  VIAddVersionKey /LANG=${LANG_ENGLISH} "ProductVersion" "6.0.2.1"
  VIAddVersionKey /LANG=${LANG_ENGLISH} "LegalCopyright" "Copyright 2017 Smellydog Coding."
  VIAddVersionKey /LANG=${LANG_ENGLISH} "FileDescription" "Installer for the West Virginia Electronic Field Guide"
  VIAddVersionKey /LANG=${LANG_ENGLISH} "FileVersion" "4.5"
  VIAddVersionKey /LANG=${LANG_ENGLISH} "Language" "English"

;--------------------------------
;Uninstaller Section

Section "Uninstall"

  ;ADD YOUR OWN FILES HERE...

  Delete "$INSTDIR\*.*"
  Delete "$INSTDIR\locales\*.*"
  Delete "$INSTDIR\resources\*.*"

  RMDir "$INSTDIR\locales"
  RMDir "$INSTDIR\resources"
  RMDir "$INSTDIR"
    
  Delete "$SMPROGRAMS\Electronic Field Guide\Electronic Field Guide.lnk"
  Delete "$SMPROGRAMS\Electronic Field Guide\Uninstall.lnk"
  RMDir "$SMPROGRAMS\Electronic Field Guide"

  DeleteRegKey /ifempty HKCU "Software\electronic-field-guide"

SectionEnd
