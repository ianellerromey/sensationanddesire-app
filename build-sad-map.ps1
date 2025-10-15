function Get-MtcbrrEntryArray($FileExtension, $StartingId) {
  $MtcbrrFiles = Get-ChildItem -Path '.\src\assets\mtcbrrs' -Name ('mtcbrr*' + $FileExtension) -File
  $MtcbrrEntryArray = @($MtcbrrFiles | ForEach-Object { $i = 0 } {
    @{
      id = $StartingId + $i
      title = [regex]::Matches($_, ('mtcbrr_\d+_(.+)\' + $FileExtension)).Groups[1].Value
      location = Join-Path -Path 'mtcbrrs' -ChildPath $_.ToString()
    }; $i++ })
  $MtcbrrEntryArray
}

function Add-LovEntryMap($LovMap, $LovFile, $LovFileRegex) {
    $LovFileMatches = [regex]::Matches($LovFile, $LovFileRegex)
    $LovTitle = $LovFileMatches.Groups[1].Value
    $LovValue = $LovFileMatches.Groups[2].Value
    if(!$LovMap.ContainsKey($LovTitle)) {
      $LovMap.Add($LovTitle, [System.Collections.ArrayList]::new())
    }
    $LovMap[$LovTitle].Add($LovValue)
}

function main {
  # Moontide Crossbridge Revelry
  $SadMtcbrrArray = Get-MtcbrrEntryArray -FileExtension '.mtcbrr' -StartingId 0

  # Moontide Crossbridge Revelry drafts
  $SadMtcbrrDraftArray = Get-MtcbrrEntryArray -FileExtension '.draft' -StartingId $SadMtcbrrArray.Count

  # Logs of Vates
  $SadLovMap = @{}
  $SadLovFiles = Get-ChildItem -Path '.\src\assets\lovs' -Recurse -Include '*.lov' -File  | % { $_.FullName } | Resolve-Path -Relative
  foreach($SadLovFile in $SadLovFiles) {
    Add-LovEntryMap -LovMap $SadLovMap -LovFile $SadLovFile -LovFileRegex '\.\\src\\assets\\lovs\\(\w+)\\(\w+\d+\.lov)'
  }
  
  $SadLovReferenceFiles = Get-ChildItem -Path '.\src\assets\lovs' -Recurse -Include '*.txt' -File  | % { $_.FullName } | Resolve-Path -Relative
  foreach($SadLovReferenceFile in $SadLovReferenceFiles) {
    Add-LovEntryMap -LovMap $SadLovMap -LovFile $SadLovReferenceFile -LovFileRegex '\.\\src\\assets\\lovs\\(\d+)\\(\w+\.txt)'
  }
  $SadLovArray = @($SadLovMap.GetEnumerator() | Sort-Object -Property Key -Descending | ForEach-Object { $i = 0 } {
    $Key = $_.Key
    @{
      id = $i
      title = $Key
      location = @($_.Value | ForEach-Object {
        Join-Path -Path (Join-Path -Path 'lovs' -ChildPath $Key) -ChildPath $_
      }) -join ';'
    }; $i++ })

  # Maybe a notice
  $SadNotice = Get-Content -Path '.\src\assets\sad-notice.txt' | Out-String
  if ($SadNotice) { $SadNotice = 'NOTICE: ' + $SadNotice}

  # Map 'em
  $SadMap = @{
    notice = $SadNotice
    disclaimer = Get-Content -Path '.\src\assets\sad-disclaimer.txt' | Out-String
    acknowledgements = Get-Content -Path '.\src\assets\sad-acknowledgements.txt' | Out-String
    mtcbrrAbout = Get-Content -Path '.\src\assets\sad-mtcbrr-about.txt' | Out-String
    mtcbrrUpdates = Get-Content -Path '.\src\assets\sad-mtcbrr-updates.txt' | Out-String
    mtcbrrReferences = Get-Content -Path '.\src\assets\sad-mtcbrr-references.txt' | Out-String
    linkInstagram = 'https://www.instagram.com/sensationanddesire'
    linkPatreon = 'https://www.patreon.com/SensationandDesire'
    lovs = $SadLovArray
    mtcbrrs = $SadMtcbrrArray
    drafts = $SadMtcbrrDraftArray
  }

  $CurrentTicks = (Get-Date).Ticks.ToString()
  $SadMapFile = ('sad-map-' + $CurrentTicks + '.json')

  Get-ChildItem -Path '.\src\assets\sad-map-*.json' | Remove-Item
  New-Item -Path ('.\src\assets\' + $SadMapFile) -ItemType 'file' -Value ($SadMap | ConvertTo-Json) -Force

  $SadConfigContent = Get-Content -Path '.\src\assets\sad-config.json' -Encoding UTF8
  $SadConfigContentModified = $SadConfigContent -ireplace 'sad-map-(\d+).json', ('sad-map-' + $CurrentTicks + '.json')
  Set-Content -Path '.\src\assets\sad-config.json' -Value $SadConfigContentModified -Encoding UTF8 -Force
}

main;